var path = require('path');
var fs = require('fs');
var q = require('q');

module.exports = function(config, http, app, req, res){
	var abspath = path.resolve('.'+req.path);
	console.log(req.path);
	console.log(abspath);
	readFileP(abspath).then(function(data){
		sendEditor(config, data, res);
	}).fail(function(err){
		res.send('Error: ' + err.toString());
	});
};

function sendEditor(config, data, res){
	readFileP(path.resolve(__dirname, '..', 'public/test.html')).then(function(value){
		var editor = value;
		editor = editor.replace('##content##',data);
		editor = editor.replace('##theme##',config.theme);
		editor = editor.replace('##edit##',config.default_edit);
		editor = editor.split('##public##').join(config.public_token);
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