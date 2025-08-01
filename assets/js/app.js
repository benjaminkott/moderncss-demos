import '../css/app.scss';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

window.addEventListener('DOMContentLoaded', function () {

    // preview control
    const preview = document.getElementById('demo-preview');
    if (preview) {
        // document width
        const previewControl = document.getElementById('demo-preview-control');
        if (previewControl) {
            previewControl.addEventListener('input', (event) => {
                const preview = document.getElementById('demo-preview-inner');
                preview.style.width = event.target.value + '%';
            });
        }

        // zoom
        function applyZoom(zoom) {
            const previewZoomControl = document.getElementById('demo-preview-zoom-control');
            const preview = document.getElementById('demo-iframe');
            preview.style.setProperty('scale', zoom * 0.01);
            preview.style.setProperty('height', 100 * (100 / zoom) + '%');
            preview.style.setProperty('width', 100 * (100 / zoom)  + '%');
            if (previewZoomControl.value !== zoom) {
                previewZoomControl.value = zoom;
            }
            localStorage.setItem('previewZoom', zoom);
        }

        const previewZoomControl = document.getElementById('demo-preview-zoom-control');
        if (previewZoomControl) {
            applyZoom(localStorage.getItem("previewZoom") ?? 100);
            previewZoomControl.addEventListener('input', (event) => {
                applyZoom(event.target.value);
            });
        }

        // inner
        const previewInnerControl = document.getElementById('demo-preview-inner-control');
        if (previewInnerControl) {
            previewInnerControl.addEventListener('input', (event) => {
                const iframe = document.getElementById('demo-iframe');
                iframe.contentDocument.querySelector('#demo-inner').style.width = event.target.value + '%';
            });
        }
    }

    // Split View
    function applySplitViewConfig(config) {
        if (config === null) {
            return;
        }
        if (config.editorSize === undefined || config.previewSize === undefined) {
            return;
        }
        document.querySelectorAll('button[data-preview-split-editor]').forEach((element) => {
            element.classList.remove('active');
        });
        const button = document.querySelector('button[data-preview-split-editor="'+ config.editorSize + '"][data-preview-split-preview="'+ config.previewSize + '"]');
        button?.classList.add('active');

        const root = document.getElementById('demo-root');
        root?.style.setProperty('--columns-editor', config.editorSize);
        root?.style.setProperty('--columns-preview', config.previewSize);
        localStorage.setItem('splitViewConfig', JSON.stringify(config));
    }

    applySplitViewConfig(JSON.parse(localStorage.getItem("splitViewConfig") ?? '{}'));

    document.querySelectorAll('button[data-preview-split-editor]').forEach((button) => {
        button.addEventListener('click', (event) => {
            applySplitViewConfig({
                editorSize: event.target.dataset.previewSplitEditor,
                previewSize: event.target.dataset.previewSplitPreview
            });
        });
    });

    // Editors
    window.previeweditors = [];
    document.querySelectorAll('[data-editor="true"]').forEach((element) => {

        const editorContainer = element.closest('.demo-editors-inner');
        const editorSection = element.closest('.demo-editor-section');

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
            const iframe = document.getElementById('demo-iframe');
            iframe.contentDocument.querySelector(target).innerHTML = editor.getValue();
        });

        // Tabs
        editorSection.querySelector('button[data-section]').addEventListener('click', (event) => {
            editorContainer.querySelectorAll('.demo-editor-section').forEach((section) => {
                section.classList.remove('active');
            });
            editorSection.classList.add('active');
        });

        // Font Size
        editorSection.querySelectorAll('button[data-editor-modify-fontsize]').forEach((button) => {
            button.addEventListener('click', (event) => {
                let options = {
                    fontSize: editor.getRawOptions().fontSize + parseInt(event.target.dataset.editorModifyFontsize)
                }
                editor.updateOptions(options);
            });
        });

        window.previeweditors.push(editor);
    });

    const loader = document.querySelector('.demo-loader');
    if (loader) {
        loader.style.display = 'none';
    }

});
