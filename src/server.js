var express = require('express');
var path = require('path');
if(!path.parse) path.parse = require("path-parse");
var bodyParser = require('body-parser');
var sendDirectory = require('./send-directory.js');
var deleteDirectory = require('./delete-directory.js');
var sendEditor = require('./send-editor.js');
var saveFile = require('./save-file.js');
var send404 = require('./404.js');
var multer = require('multer');
var uploader = multer();
module.exports = function(config, http, app){
	console.log(config);
	app.use(bodyParser.json({limit: '100mb'}));
	app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
	app.post('/*',uploader.any(),function(req,res,next){
		next();
	});
	app.use(function(req, res, next){
		if(req.method=='POST'){
			console.log('save at: ' + req.originalUrl);
			saveFile(config, http, app, req, res, next);
		} else if(req.method=='DELETE'){
			console.log('deleting at: ' + req.originalUrl);
			deleteDirectory(config, http, app, req, res);
		} else
			next();
	});
	app.use(function(req, res, next){
		console.log('Request at: ' + req.originalUrl);
		if(config.restricted.indexOf(path.parse(req.path).ext)>=0 &&
		path.parse(req.path).dir.split('/').length>1 &&
		path.parse(req.path).dir.split('/')[1]!=config.public_token){
			send404(path.parse(req.path).ext,config,res);
			return;
		}
		if(req.query.edit == true){
			sendEditor(config, http, app, req, res);
		} else if (req.originalUrl[req.originalUrl.length-1]=="/"){
			sendDirectory(config, http, app, req, res);
		} else {
			next();
		}
	});
	
	app.use(express.static(path.resolve(config.directory)));
	
	app.use('/'+config.public_token, 
	express.static(path.resolve(__dirname,'..','public')));
	app.use(function(req,res){
		send404(path.parse(req.path).ext,config,res);
	});
	http.listen(config.port,function(){
		console.log('listening on port ' + config.port);
	});
};
