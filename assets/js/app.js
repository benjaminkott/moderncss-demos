import '../css/app.scss';

const preview = document.querySelector('#demo-preview');
const previewControl = document.querySelector('#demo-preview-control');
previewControl.addEventListener('input', (event) => {
    preview.style.width = event.target.value + '%';
});
