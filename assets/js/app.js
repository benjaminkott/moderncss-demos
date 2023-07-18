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

document.querySelectorAll('[data-editor="true"]').forEach((element) => {
    // Tabs
    const button = element.parentElement.querySelector('button[data-section]').addEventListener('click', (event) => {
        event.target.parentElement.parentElement.querySelectorAll('.demo-editor-section').forEach((section) => {
            section.classList.remove('active');
        });
        event.target.parentElement.classList.add('active');
    });

    // Editor
    const language = element.dataset.language;
    const target = element.dataset.target;
    const initialValue = element.querySelector('textarea').value;
    element.querySelector('textarea').remove();
    const editor = monaco.editor.create(element, {
        value: initialValue,
        automaticLayout: true,
        folding: false,
        language: language,
        theme: 'vs-dark',
        fontSize: 16,
        lineNumbers: false,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
    })
    editor.onDidChangeModelContent((event) => {
        preview.contentDocument.querySelector(target).innerHTML = editor.getValue();
    });
});
