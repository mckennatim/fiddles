####automatic page description, tags, link list
In order for this to work you need meta tags like this in the index.html page of each exercise under the fiddles directory.

    <meta name="description" content="Short exercises in programming">
    <meta property="og:type" content="website">
    <meta property="og:tags" content='["orderBy", "directives", "constant",  "isolate scope & = @"]'>
    <title>fiddles</title>

#### code explanation
This is an exercise at learning gulp and a little functional programming, particularly how to write my own gulp plugins. In this gulpfile:

    var gulp = require('gulp');
    var meta = require('./sb_gulp/meta/');
    var wrap = require('./sb_gulp/wrapInArr/');
    var concat =require('gulp-concat');
    var watch = require('gulp-watch'); 

    var jsfiles = ['./js/**/index.html'];
     
    gulp.task('getMeta', function () {
      watch("./**/index.html", function(){
        gulp.src("./**/index.html")
        .pipe(meta())
        .pipe(concat("fiddles.json"))
        .pipe(wrap())
        .pipe(gulp.dest("./"))    
      })
    });

uses ./sb_gulp/meta/ to grab the meta tag info:

    var desc = window.$('meta[name="description"]').attr("content");

to create a json string of data that feeds the sb-file-list directive. You get a list of all the exercises in this and subdirectories with a description, tags and links. 

Also, this is an example of self documenting programming exercises using the sb-md directive which uses the showdown loaded from index.html.    , 
