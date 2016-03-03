var path = require('path');
var fs = require('fs');
var q = require('q');

module.exports = function(config, http, app, req, res){
	var abspath = path.resolve('.'+req.path);
	if(req.body.data){
		writeFileP(abspath,req.body.data).then(function(data){
			res.send('saved');
		}).fail(function(err){
			makeDirP(abspath,req.body.data).then(function(){
				res.send('Made dir');
			},function(error){
				res.send('Error: ' + err.toString()+'<br/> Or '+error.toString());
			});
			console.log(err);
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

function makeDirP(filepath, filename){
	var defer = q.defer();
	fs.mkdir(path.join(filepath, filename), function(error, data){
		if(error){
			defer.reject(new Error(error));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
}