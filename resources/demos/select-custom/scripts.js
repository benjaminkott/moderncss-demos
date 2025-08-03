document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('appearance', 'base-select')) {
        window.demotools.notsupported('This browser does not support <strong>appearance: base-select</strong>.');
    }
    if (!CSS.supports('scrollbar-color', 'black black')) {
        window.demotools.notsupported('This browser does not support <strong>scrollbar-color</strong>.');
    }
    if (typeof CSSStartingStyleRule !== 'function') {
        window.demotools.notsupported('This browser does not support <strong>@starting-style</strong>.');
    }
    if (!CSS.supports('transition-behavior', 'allow-discrete')) {
        window.demotools.notsupported('This browser does not support <strong>transition-behavior: allow-discrete</strong>.');
    }
});
