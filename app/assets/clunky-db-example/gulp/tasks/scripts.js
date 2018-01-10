//gulp transpile and bundle tasks.
var gulp = require('gulp'),
argv = require('yargs').argv,
webpack = require('webpack'),
sourcemaps = require("gulp-sourcemaps"),
babel = require("gulp-babel"),
concat = require("gulp-concat"),
fileCache = require("gulp-cache-files");



/**
 * This is for server scripts.
 */
gulp.task("babel",['deleteDocsFolder','deletePublicFolder'], function () {
    if(!!argv.cu){
        return gulp.src("app/assets/server/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("server.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("docs/assets/server"));
    } else {
        return;
    }
    
});

/**
 * This is for Client scripts. It is more simple to me to run the server side stuff without webpack.
 */
gulp.task('scripts',['babel'], function(callback){
    if(!!argv.cu){
        webpack(require('../../webpack.config.js'), function(err,stats){
            if(err) {
                console.log(err.toString());
            }
            //console.log(stats.toString());
            callback();
        });
    } else {
        callback();
    }
    
});