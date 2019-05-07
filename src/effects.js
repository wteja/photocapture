exports.choose = (seriously, src, target, effectName = 'vanilla') => {
    if (effectName === 'vanilla') {
        target.source = src;
    } else {
        const effect = seriously.effect(effectName);
        effect.source = src;
        target.source = effect;
    }
    seriously.go();
}