var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDocs',['build'],function(){
    browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	
	});
});

gulp.task('deletedocsFolder',function(){
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['deletedocsFolder'],function(){
    var pathsToCopy = [
        './app/**/*',
        './app/.env',
        './app/index.html',
        './app/temp/styles*.css',
        '!./app/assets/scripts/*',
        '!./app/assets/scripts/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/temp',
        '!./app/temp/**',
        '!./app/public/Highcharts/examples/**/*',
        '!./app/public/Highcharts/exporting-server/**/*',
        '!./app/public/Highcharts/gfx/**/*',
        '!./app/public/Highcharts/graphics/**/*',
        '!./app/public/Highcharts/api/**/*',
        '!./**/assets/**/app',
        '!./**/assets/**/app/**/',
        '!./**/gulpfile.js',
        '!./**/package.json',
        '!./**/yarn.lock',
        '!./**/webpack.config.js',
        '!./**/gulp',
        '!./**/gulp/**/*',

    ];
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deletedocsFolder'],function() {
    return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
    .pipe(imageMin({
        progressive: true,
        interlaces: true,
        multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['deletedocsFolder', 'css','scripts'],function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css: [function(){return rev();}],
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(gulp.dest("./docs/"));
});

gulp.task('build',['copyGeneralFiles']);