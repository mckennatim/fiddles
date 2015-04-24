var through = require('through2');

const PLUGIN_NAME = 'wrapInArr';
function wrapInArr(){
	var stream = through.obj(function(file, enc, cb) {
		var content = file.contents.toString().slice(0,-1);
		var buf = new Buffer('[ '+ content + ' ]');
		file.contents = buf;
		this.push(file);
		cb();	
	})
	return stream;
}
module.exports = wrapInArr;