function handleSuccess(videoEl, stream) {
    videoEl.srcObject = stream;
}

exports.init = (nav, videoEl) => {
    const constrain = {
        audio: false,
        video: {
            width: {
                min: 853
            },
            height: {
                min: 480
            }
        }
    };

    nav.mediaDevices.getUserMedia(constrain)
        .then(stream => handleSuccess(videoEl, stream))
        .catch(console.error);
}

exports.captureByBytes = (videoEl, ctx, canvasEl) => {
    ctx.drawImage(videoEl, 0, 0);
    return canvasEl.toDataURL('image/png');
}

exports.captureByBytesFromLiveCanvas = canvasEl => {
    return canvasEl.toDataURL('image/png');
}