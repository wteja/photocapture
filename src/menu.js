const electron = require('electron');
const { app } = electron;
const images = require('./images');

module.exports = mainWindow => {
    const name = app.getName();
    const template = [
        {
            label: 'Effects',
            submenu: [
                {
                    label: 'Vanilla',
                    click: () => mainWindow.webContents.send('effect-choose', 'vanilla')
                },
                {
                    label: 'Ascii',
                    click: () => mainWindow.webContents.send('effect-choose', 'ascii')
                },
                {
                    label: 'Daltonize',
                    click: () => mainWindow.webContents.send('effect-choose', 'daltonize')
                },
                {
                    label: 'Film Grain',
                    click: () => mainWindow.webContents.send('effect-choose', 'filmgrain')
                },
                {
                    label: 'Hex',
                    click: () => mainWindow.webContents.send('effect-choose', 'hex')
                },
                {
                    label: 'Kaleidoscope',
                    click: () => mainWindow.webContents.send('effect-choose', 'kaleidoscope')
                },
                {
                    label: 'Mirror',
                    click: () => mainWindow.webContents.send('effect-choose', 'mirror')
                },
                {
                    label: 'Night Vision',
                    click: () => mainWindow.webContents.send('effect-choose', 'nightvision')
                },
                {
                    label: 'Pixelate',
                    click: () => mainWindow.webContents.send('effect-choose', 'pixelate')
                },
                {
                    label: 'Ripple',
                    click: () => mainWindow.webContents.send('effect-choose', 'ripple')
                },
                {
                    label: 'Scanlines',
                    click: () => mainWindow.webContents.send('effect-choose', 'scanlines')
                },
                {
                    label: 'Sketch',
                    click: () => mainWindow.webContents.send('effect-choose', 'sketch')
                },
                {
                    label: 'Vibrance',
                    click: () => mainWindow.webContents.send('effect-choose', 'vibrance')
                },
                {
                    label: 'Vignette',
                    click: () => mainWindow.webContents.send('effect-choose', 'vignette')
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Photos Directory',
                    click: () => images.openDir(images.getPicturesDir(app))
                }
            ]
        }];

    if (process.platform === 'darwin') {
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+Shift+H',
                    role: 'hide'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                },
            ]
        });
    }

    return template;
}