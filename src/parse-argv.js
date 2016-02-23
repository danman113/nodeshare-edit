var parseConfig = require('./parse-config.js');
var path = require('path');

module.exports = function(argv){
	var defaultValues = {
		port:null,
		config:null
	};
	if(argv.port){
		if(!isNaN(+argv.port)){
			defaultValues.port = +argv.port;
		} else {
			console.warn('--port: Invalid port, port must me number');
		}
	}
	if(argv.config){
		defaultValues.config = argv.config;
	}
	var config = parseConfig(
		path.resolve(__dirname,'../config/default.json'));
	var newConfig;
	if(defaultValues.config){
		newconfig = parseConfig(defaultValues.config);
		for(var i in newconfig){
			config[i] = newconfig[i];
		}
	}
	if(config.error) return {error:config.error};
	if(defaultValues.port) config.port = defaultValues.port;
	return config;
};