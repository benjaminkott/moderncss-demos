document.addEventListener('DOMContentLoaded', function() {
    if (typeof CSSStartingStyleRule !== 'function') {
        window.demotools.notsupported('This browser does not support <strong>@starting-style</strong>.');
    }

    document.querySelectorAll('[data-modal-toggle]').forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector('#modal').classList.toggle('show');
        });
    })
});
