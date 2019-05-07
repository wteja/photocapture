const path = require('path');
const fs = require('fs');
const shell = require('electron').shell;
const spawn = require('child_process').spawn;
const logError = err => err && console.error(err)

let images = [];

exports.save = (picturesPath, contents, done) => {
    const bytes = contents.replace(/^data:image\/png;base64,/, '');
    const imgPath = path.join(picturesPath, `${new Date().valueOf()}.png`);
    fs.writeFile(imgPath, bytes, { encoding: 'base64' }, err => {
        if (err) {
            return logError(err);
        }
        done(null, imgPath);
    });
}

exports.getPicturesDir = app => {
    return path.join(app.getPath('pictures'), 'photocapture');
}

exports.mkdir = picturesPath => {
    fs.stat(picturesPath, (err, stats) => {
        if (err && err.code !== 'ENOENT') {
            return logError(err);
        } else if (err || !stats.isDirectory()) {
            fs.mkdir(picturesPath);
        }
    });
}

exports.rm = (index, done) => {
    fs.unlink(images[index], err => {
        if (err)
            return logError(err)

        images.splice(index, 1);
        done();
    })
}

exports.cache = imgPath => {
    images = images.concat([imgPath]);
    return images;
}

exports.getFromCache = index => {
    return images[index];
}

const openCmd = {
    darwin: 'open',
    win32: 'explorer',
    linux: 'nautilus'
};

exports.openDir = dirPath => {
    const cmd = openCmd[process.platform];
    if (cmd) {
        spawn(cmd, [dirPath]);
    } else {
        shell.showItemInFolder(dirPath);
    }
}