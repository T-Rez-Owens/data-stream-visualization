var gulp = require("gulp");
var gulpIgnore = require('gulp-ignore');
var zip = require('gulp-zip');
var foreach  = require('gulp-foreach');
var gulpIgnore = require('gulp-ignore');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var condition = '_*';

gulp.task("zipAll", function(){
    return gulp.src('src/*')
        .pipe(foreach(function(stream, file){
           var fileName = file.path.substr(file.path.lastIndexOf("/")+1);
           gulp.src(["src/" + fileName + "/**/*", '!./_*/**'])
               .pipe(zip(fileName + ".zip"))
               .pipe(gulp.dest("dist"));
           return stream;
        }));
 });