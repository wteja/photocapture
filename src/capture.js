const electron = require('electron');

const { ipcRenderer: ipc, shell, remote } = electron;

const video = require('./video');
const countdown = require('./countdown');
const flash = require('./flash');
const effects = require('./effects');
const images = remote.require('./images');

let canvasTarget = null;
let seriously = null;
let videoSrc = null;

function formatImgTag(doc, bytes) {
    const div = doc.createElement('div');
    div.classList.add('photo');
    const close = doc.createElement('div');
    close.classList.add('photo-close');
    const img = new Image();
    img.classList.add('photo-img');
    img.src = bytes;
    div.appendChild(img);
    div.appendChild(close);
    return div;
}

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.querySelector('.video');
    const canvasEl = document.querySelector('.canvas');
    const recordEl = document.querySelector('.record');
    const photosEl = document.querySelector('.photos-container');
    const counterEl = document.querySelector('.counter');
    const flashEl = document.querySelector('.flash');

    seriously = new Seriously();
    videoSrc = seriously.source('#video');
    canvasTarget = seriously.target('#canvas');
    effects.choose(seriously, videoSrc, canvasTarget, 'vanilla');

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', () => {
        countdown.start(counterEl, 3, () => {
            flash(flashEl);
            const bytes = video.captureByBytesFromLiveCanvas(canvasEl);
            ipc.send('image-captured', bytes);
            photosEl.appendChild(formatImgTag(document, bytes));
        });
    });

    photosEl.addEventListener('click', ev => {
        const isRm = ev.target.classList.contains('photo-close');
        const selector = isRm ? '.photo-close' : '.photo-img';
        const photos = Array.from(document.querySelectorAll(selector));
        const index = photos.findIndex(el => el == ev.target);
        if (index > -1) {
            if (isRm) {
                ipc.send('image-remove', index);
            } else {
                shell.showItemInFolder(images.getFromCache(index));
            }
        }
    });

    ipc.on('image-removed', (ev, index) => {
        document.querySelectorAll('.photo')[index].remove();
    })

    ipc.on('effect-choose', (ev, effectName) => {
        effects.choose(seriously, videoSrc, canvasTarget, effectName);
    });
});