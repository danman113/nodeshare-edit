var express = require('express');
var app = express();
var http = require('http').Server(app);
var argv = require('minimist')(process.argv.slice(2));
var parseArgv = require('./src/parse-argv.js');
var server = require('./src/server.js');

var main = function(){
	console.log(argv);
	var config = parseArgv(argv);
	if(config.error){
		console.error(config.error);
		process.exit(1);
	} else if (argv._.length < 1) {
		config.directory = '.';
	} else {
		config.directory = argv._[0];
	}
	
	server(config,http,app);
};

main();