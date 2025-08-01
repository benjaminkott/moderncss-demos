document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('appearance', 'base-select')) {
        window.demotools.notsupported('This browser does not support <strong>appearance: base-select</strong>.');
    }
});
