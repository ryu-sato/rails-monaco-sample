import monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('monaco-editor'), {
	value: 'console.log("Hello, world")',
	language: 'javascript'
});
