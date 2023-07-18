import '../css/app.scss';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const preview = document.getElementById('demo-preview');
const previewControl = document.getElementById('demo-preview-control');
previewControl.addEventListener('input', (event) => {
    preview.style.width = event.target.value + '%';
});

const previewInnerControl = document.getElementById('demo-preview-inner-control');
previewInnerControl.addEventListener('input', (event) => {
    preview.contentDocument.querySelector('#demo-inner').style.width = event.target.value + '%';
});

const initialStyles = document.getElementById('demo-preview-styles').querySelector('textarea').value;
document.getElementById('demo-preview-styles').querySelector('textarea').remove();
const editorStyles = monaco.editor.create(document.getElementById('demo-preview-styles'), {
    value: initialStyles,
    language: 'css',
    theme: 'vs-dark',
    fontSize: 16,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
});
editorStyles.onDidChangeModelContent((event) => {
    preview.contentDocument.querySelector('#demo-styles').innerHTML = editorStyles.getValue();
});
