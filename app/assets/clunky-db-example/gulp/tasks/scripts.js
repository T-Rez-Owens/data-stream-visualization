//gulp transpile and bundle tasks.
var gulp = require('gulp'),
webpack = require('webpack'),
sourcemaps = require("gulp-sourcemaps"),
babel = require("gulp-babel"),
concat = require("gulp-concat"),
fileCache = require("gulp-cache-files");



/**
 * This is for server scripts.
 */
gulp.task("babel",['deleteDocsFolder'], function () {
    return gulp.src("app/assets/server/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("server.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("docs/assets/server"));
});

/**
 * This is for Client scripts. It is more simple to me to run the server side stuff without webpack.
 */
gulp.task('scripts',['babel'], function(callback){
    webpack(require('../../webpack.config.js'), function(err,stats){
        if(err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});