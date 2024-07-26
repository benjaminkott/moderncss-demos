document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('text-wrap', 'balance')) {
        window.demotools.notsupported('This browser does not support <strong>text-wrap: balance</strong>.');
    }
    if (!CSS.supports('text-wrap', 'pretty')) {
        window.demotools.notsupported('This browser does not support <strong>text-wrap: pretty</strong>.');
    }
});

