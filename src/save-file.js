var path = require('path');
var fs = require('fs');
var q = require('q');

module.exports = function(config, http, app, req, res){
	var abspath = path.resolve('.'+req.path);
	if(req.body.data){
		writeFileP(abspath,req.body.data).then(function(data){
			res.send('saved');
		}).fail(function(err){
			res.send('Error: ' + err.toString());
		});
	}
};



function writeFileP(filepath, file){
	var defer = q.defer();
	fs.writeFile(filepath, file,'utf8', function(err, data){
		if(err){
			defer.reject(new Error(err));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
}