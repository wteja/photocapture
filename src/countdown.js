function setCountdown(el, number) {
    el.innerHTML = number > 0 ? number : '';
}

exports.start = (counterEl, delay, done) => {
    for (let i = 0; i <= delay; i++) {
        setTimeout(() => {
            const count = delay - i;
            setCountdown(counterEl, count);
            if (i === delay) {
                done();
            }
        }, i * 1000);
    }
}