//Gulp preview tasks
var gulp = require('gulp'),
watch = require('gulp-watch'),
nodemon = require('gulp-nodemon'),
browserSync = require('browser-sync').create();

/**
 * This task doesn't work well with generated files.
 */
gulp.task('previewDocs',['build'],function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs/assets/client"
		}
	});
});

gulp.task('watch', ['build'], function () {
	var stream = nodemon({
		script: 'docs/assets/server/server.js' // run ES5 code 
		, watch: 'app/assets/server' // watch ES2015 code 
		, ignore: ['app/temp','docs'] //too many restarts on a new build without this
		, tasks: ['build'] // compile synchronously onChange
	});
		
})