var fs = require('fs');

module.exports = function(filename){
	var file;
	try{
		file = fs.readFileSync(filename,'utf8');
		if(!file) return {error:"file not found"};
	} catch(e){
		return {error:e.toString()};
	}
	try{
		var json = JSON.parse(file);
		return json;
	} catch(e){
		 return {error:e.toString()};
	}
};