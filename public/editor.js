
editor.commands.addCommand({
	name: 'save',
	bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
	exec: function(editor) {
		console.log('saving folder');
		$.post(window.location, {data: editor.getValue()}, function(data) {
			console.log(data);
		});
	},
	readOnly: false 
});

editor.commands.addCommand({
	name: 'moveUp',
	bindKey: {win: 'Ctrl-Shift-Up',  mac: 'Ctrl-Shift-Up'},
	exec: function(editor) {
		editor.moveLinesUp();
	},
	readOnly: false 
});
editor.commands.addCommand({
	name: 'moveDown',
	bindKey: {win: 'Ctrl-Shift-Down',  mac: 'Ctrl-Shift-Down'},
	exec: function(editor) {
		editor.moveLinesDown();
	},
	readOnly: false 
});
