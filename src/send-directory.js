var path = require('path');
var fs = require('fs');
var q = require('q');


module.exports = function(config, http, app, req, res){
	readDir(req.path).then(function(data){
		console.log(data);
		var dir = {};
		for (var i = data.length - 1; i >= 0; i--) {
			console.log(path.join(req.path,data[i]));
			statP(path.resolve(path.join('.',req.path,data[i])))
			.then(closureKeeper(data[i],dir,data.length,function(data){
				formatDirectory(config, req, res, data);
			}));
		}
		if(data.length<=0){
			formatDirectory(config, req, res, data);
		}
	}).fail(function(err){
		console.log(err);
		res.send(err.toString());
	});
};

function formatDirectory(config, req, res, data){
	if(!config.filebroswer) config.filebroswer = "./filebrowser.html";
	var browserPath = "";
	if(path.isAbsolute(config.filebroswer)){
		browserPath = path.resolve(config.filebroswer);
	} else {
		browserPath = path.resolve(__dirname, '..', 'public', config.filebroswer);
	}
	console.log(path.parse(req.path).dir);
	readFileP(browserPath)
	.then(function(value){
		var editor = value;
		editor = editor.replace('##content##',data);
		editor = editor.replace('##theme##',config.theme);
		editor = editor.replace('##edit##',config.default_edit);
		editor = editor.split('##public##').join(config.public_token);
		editor = editor.split('##path##').join(req.path);
		editor = editor.split('##back##').join(path.parse(req.path).dir);
		var filespace = editor.match(/\$\$([\s\S])*\$\$/g);
		var str = "";
		if(filespace){
			for(var i in data){
				if(i[0]=='.')
					continue;
				var string = "";
				string = filespace[0].replace('$$','').replace('$$','')
				.split('##filename##').join(i).split('##filesize##')
				.join(data[i].size)
				.replace(/\#\#folder\#\#([^#]*)\#\#folder\#\#/g,function(a,b){
					if(data[i].isDirectory())
						return b;
					else
						return '';
				}).replace(/\#\#file\#\#([^#]*)\#\#file\#\#/g,function(a,b){
					if(data[i].isFile())
						return b;
					else
						return '';
				});
				str += string;
			}
		}
		editor = editor.replace(/\$\$([\s\S])*\$\$/g,str);
		res.send(editor);
	}).fail(function(err){
		console.log(err);
		res.send('Error: ' + err.toString());
	});
}

function statP(filepath){
	var defer = q.defer();
	fs.stat(filepath, function(err, data){
		if(err){
			defer.reject(new Error(err));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
}

function readDir(filepath){
	var defer = q.defer();
	console.log(path.join('.',filepath));
	fs.readdir(path.resolve(path.join('.',filepath)), function(err, data){
		if(err){
			defer.reject(new Error(err));
		} else {
			defer.resolve(data);
		}
	});
	return defer.promise;
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

//required to keep filename in context
function closureKeeper(filename,dir,limit,callback){
	return function(data){
		dir[filename] = data;
		var i=0;
		for(var d in dir){
			i++;
		}
		if(i==limit)
			callback(dir);
	};
}
