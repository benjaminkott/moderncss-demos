document.addEventListener('DOMContentLoaded', function() {
    if (typeof CSSStartingStyleRule !== 'function') {
        window.demotools.notsupported('This browser does not support <strong>@starting-style</strong>.');
    }

    if (!CSS.supports('transition-behavior', 'allow-discrete')) {
        window.demotools.notsupported('This browser does not support <strong>transition-behavior: allow-discrete</strong>.');
    }

    document.querySelectorAll('[data-modal-toggle]').forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector('#modal').classList.toggle('show');
        });
    })
});
