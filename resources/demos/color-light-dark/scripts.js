document.addEventListener('DOMContentLoaded', function() {
    if (!CSS.supports('color', 'light-dark(#fff,#000)')) {
        window.demotools.notsupported('This browser does not support <strong>light-dark()</strong>.');
    }
});

