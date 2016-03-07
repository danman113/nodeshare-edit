
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

function setFontSize(fontsize){
	var fontSize = fontsize || '16px';
	document.getElementById('editor').style.fontSize=fontSize;
}

function setTabLength(){
	var tabsize = 4;
	editor.getSession().setTabSize(tabsize);
	var useSoftTabs = true;
	editor.getSession().setUseSoftTabs(useSoftTabs);
}
setFontSize();

function addStyle(id,content){
	var style = $('<style id="'+id+'">'
	+'.'+id+'{'
	+'position:absolute;'
	+'background:rgba(100,100,200,1);'
	+'z-index:40; width:2px!important'
	+'}'
	+'.bar::before{'
	+'position:absolute;'
	+'background:rgba(100,100,200,1);'
	+'z-index:999999;'
	+'top: -100%; left:0px; font-family: Arial; padding:1px 2px;content:'+'"'+content+'";'
	+'}'
	+'</style>');
$('html > head').append(style);
}
function editStyle(id,content){
	var style = ''
	+'.'+id+'{'
	+'position:absolute;'
	+'background:rgba(100,100,200,1);'
	+'z-index:40; width:2px!important'
	+'}'
	+'.bar::before{'
	+'position:absolute;'
	+'background:rgba(100,100,200,1);'
	+'z-index:99999;'
	+'top: -100%; left:0px; font-family: Arial; padding:1px 2px;content:'+'"'+content+'";'
	+'}'
	+''
	$('#'+id+'').text(style);
}

function addMarker(x,y){
	var marker = editor.session.addMarker(new Range(y,x,y,x+1), "bar", true, true);
	return marker;
}
function editMarker(id,x,y){
	editor.session.removeMarker(id);
	return editor.session.addMarker(new Range(y,x,y,x+1), "bar", true, true);
}