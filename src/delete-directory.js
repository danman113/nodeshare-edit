var path = require('path');
var q = require('q');
var fs = require('fs');
var fsExtra = require('fs-extra');

module.exports = function(config, http, app, req, res){
	var abspath = path.resolve('.'+req.path);
	deleteFileP(abspath).then(function(){
		console.log('deleting file');
		res.send('{"error":0,"text":"Deleted File"}');
	}).fail(function(err){
		console.log('deleting directory!');
		res.send('{"error":0,"text":"'+err.toString()+'"}');
	});
	console.log(abspath);
};

function deleteFileP(filepath){
	var defer = q.defer();
	fsExtra.remove(filepath, function(err, data){
		if(err){
			defer.reject(new Error(err));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
}
