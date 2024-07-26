document.addEventListener('DOMContentLoaded', function() {
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
        window.demotools.notsupported('This browser does not support the <strong>PopoverApi</strong>.');
    }
});
