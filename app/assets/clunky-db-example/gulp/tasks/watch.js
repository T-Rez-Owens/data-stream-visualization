var gulp = require('gulp'),
watch = require('gulp-watch'),
nodemon = require('gulp-nodemon'),
browserSync = require('browser-sync').create();



gulp.task('watch', ['build'], function () {
	var stream = nodemon({
				   script: 'docs/server.js' // run ES5 code 
				 , watch: 'app' // watch ES2015 code 
				 , tasks: ['build'] // compile synchronously onChange
				 });
		
  })