var gulp = require('gulp');
var meta = require('./sb_gulp/meta/');
var wrap = require('./sb_gulp/wrapInArr/');
var concat =require('gulp-concat');
var watch = require('gulp-watch'); 

var jsfiles = ['./js/**/index.html'];
 
gulp.task('watchMeta', function () {
	watch("./**/index.html", function(){
		gulp.src(["./**/index.html", "!./**/node_modules/**/index.html"])
		.pipe(meta())
		.pipe(concat("fiddles.json"))
		.pipe(wrap())
		.pipe(gulp.dest("./"))		
	})
});

gulp.task('getMeta', function () {
	gulp.src(["./**/index.html", "!./**/node_modules/**/index.html"])
	.pipe(meta())
	.pipe(concat("fiddles.json"))
	.pipe(wrap())
	.pipe(gulp.dest("./"))		
});