var express = require('express');
var path = require('path');
var sendDirectory = require('./send-directory.js');
var sendEditor = require('./send-editor.js');
module.exports = function(config, http, app){
	console.log(config);
	app.use(function(req, res, next){
		console.log("Request at: " + req.originalUrl);
		if(req.query.edit == true){
			sendEditor(config, http, app, req, res);
		} else if (req.originalUrl[req.originalUrl.length-1]=="/"){
			sendDirectory(config, http, app, req, res);
		} else {
			next();
		}
	});
	app.use(express.static(path.resolve(config.directory)));
	http.listen(config.port,function(){
		console.log('listening on port ' + config.port);
	});
};
