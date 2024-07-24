import '../css/inline.scss';

window.addEventListener('DOMContentLoaded', function () {
    const zoom = localStorage.getItem("previewZoom") ?? 100;
    document.querySelector('html').style.setProperty('--zoom', zoom);
});
