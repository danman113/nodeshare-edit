var path = require('path');
var fs = require('fs');
var q = require('q');

module.exports = function(config, http, app, req, res){
	var abspath = path.resolve('.'+req.path);
	console.log(req.path);
	console.log(abspath);
	var edit = config.default_edit;
	var filetype = path.parse(req.path).ext;
	if(filetype in config.languages)
		edit = config.languages[filetype];
	sendEditor(config, '', res, edit);
};

function sendEditor(config, data, res, filetype){
	readFileP(path.resolve(__dirname, '..', 'public/editor.html'))
	.then(function(value){
		var editor = value;
		editor = editor.replace('##content##',data);
		editor = editor.replace('##theme##',config.theme);
		editor = editor.replace('##edit##',filetype);
		editor = editor.split('##public##')
				.join(config.public_token);
		res.send(editor);
	}).fail(function(err){
		res.send('Error: ' + err.toString());
	});
}

function readFileP(filepath){
	var defer = q.defer();
	fs.readFile(filepath,'utf8', function(err, data){
		if(err){
			defer.reject(new Error(err));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
}