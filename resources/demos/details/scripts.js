document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('interpolate-size', 'allow-keywords')) {
        window.demotools.notsupported('This browser does not support <strong>interpolate-size</strong>.');
    }

    if (!CSS.supports("selector(::details-content)")) {
        window.demotools.notsupported('This browser does not support <strong>::details-content</strong>.');
    }

    if (!CSS.supports("selector(::marker)")) {
        window.demotools.notsupported('This browser does not support <strong>::marker</strong>.');
    }

    if (!('registerProperty' in CSS)) {
        window.demotools.notsupported('This browser does not support <strong>@property</strong>.');
    }
});
