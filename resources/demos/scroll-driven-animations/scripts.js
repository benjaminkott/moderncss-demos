document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('animation-timeline', 'scroll()')) {
        window.demotools.notsupported('This browser does not support the <strong>animation-timeline</strong>.');
    }

    if (!CSS.supports('animation-range', 'entry exit')) {
        window.demotools.notsupported('This browser does not support the <strong>animation-range</strong>.');
    }
});
