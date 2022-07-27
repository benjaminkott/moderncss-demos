import '../css/app.scss';

const preview = document.querySelector('#demo-preview');
const previewControl = document.querySelector('#demo-preview-control');
previewControl.addEventListener('input', (event) => {
    preview.style.width = event.target.value + '%';
});

const previewInnerControl = document.querySelector('#demo-preview-inner-control');
previewInnerControl.addEventListener('input', (event) => {
    preview.contentDocument.querySelector('#demo-inner').style.width = event.target.value + '%';
});
