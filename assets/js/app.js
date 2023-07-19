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

window.previeweditors = [];
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
    window.previeweditors.push(editor);
});

document.querySelectorAll('button[data-preview-split-editor]').forEach((button) => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('button[data-preview-split-editor]').forEach((element) => {
            element.classList.remove('active');
        });
        button.classList.add('active');

        const editorWidth = event.target.dataset.previewSplitEditor;
        const previewWidth = event.target.dataset.previewSplitPreview;
        const root = document.getElementById('demo-root');

        root.style.setProperty('--columns-editor', editorWidth);
        root.style.setProperty('--columns-preview', previewWidth);
    });
});

document.querySelectorAll('button[data-editor-modify-fontsize]').forEach((button) => {
    button.addEventListener('click', (event) => {
        window.previeweditors.forEach(editor => {
            let options = {
                fontSize: editor.getRawOptions().fontSize + parseInt(event.target.dataset.editorModifyFontsize)
            }
            editor.updateOptions(options);
        });
    });
});
