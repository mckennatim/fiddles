var jsdom = require("jsdom");
var through = require('through2');

const PLUGIN_NAME = 'meta';

function meta() {
    var stream = through.obj(function(file, enc, cb) {
        var content = file.contents.toString();
        var url = file.relative.replace(/\\/g, '/');
        var that = this;
        jsdom.env(
            content, ["http://code.jquery.com/jquery.js"],
            function(errors, window) {
                var title = window.$("title").text()
                var desc = window.$('meta[name="description"]').attr("content");
                var type = window.$('meta[property="og:type"]').attr("content");
                var tags = window.$('meta[property="og:tags"]').attr("content")||'"undefined"';

                var buf = new Buffer('{"url": "' + url + '", "title": "' + title + '" , "desc": "' + desc + '" , "type": "' + type + '" , "tags": '+ tags +  '},');
                file.contents = buf;
                that.push(file);
                cb();
            }
        );
    })
    return stream;
}
module.exports = meta;
