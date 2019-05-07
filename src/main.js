const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

const menuTemplate = require('./menu');
const images = require('./images');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 1920,
        height: 800,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    images.mkdir(images.getPicturesDir(app));

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow));
    Menu.setApplicationMenu(menuContents);
});

ipcMain.on('image-captured', (ev, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
        images.cache(imgPath);
    });
});

ipcMain.on('image-remove', (ev, index) => {
    images.rm(index, () => {
        ev.sender.send('image-removed', index);
    });
});