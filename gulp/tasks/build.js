var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
changed = require('gulp-changed'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
argv = require('yargs').argv,
print = require('gulp-print');

gulp.task('previewDocs',['build'],function(){
    browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	
	});
});

gulp.task('deletedocsFolder',function(){
    if(!!argv.d){
        return del("./docs");
    }
        
});

gulp.task('copyGeneralFiles', ['deletedocsFolder'],function(){
    var pathsToCopy = [
        './app/**/*',
        './app/temp/styles*.css',
        '!./app/index.html',
        '!./app/assets/scripts/*',
        '!./app/assets/scripts/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/temp',
        '!./app/temp/**',
        '!./**/assets/**/app',
        '!./**/assets/**/app/**/',
        '!./**/gulpfile.js',
        '!./**/package.json',
        '!./**/yarn.lock',
        '!./**/webpack.config.js',
        '!./**/gulp',
        '!./**/gulp/**/*',

    ];
    console.log("Checking which files changed: ");
    return gulp.src(pathsToCopy)
    .pipe(changed("./docs"))
    .pipe(print(function(filepath) {
        return "Copying: " + filepath;
      }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deletedocsFolder'],function() {
    if(!!argv.i){
        return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
        .pipe(changed("./docs"))
        .pipe(print(function(filepath) {
            return "minifying: " + filepath;
          }))
        .pipe(imageMin({
            progressive: true,
            interlaces: true,
            multipass: true
        }))
        .pipe(print(function(filepath) {
            return "Copying image: " + filepath;
          }))
        .pipe(gulp.dest("./docs/assets/images"));
    } else {
        return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
        .pipe(print(function(filepath) {
            return "Copying image: " + filepath;
          }))
        .pipe(gulp.dest("./docs/assets/images"));
    }
    
});

gulp.task('usemin',['deletedocsFolder', 'css','scripts'],function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css: [function(){return rev();}],
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(print(function(filepath) {
        return "code built: " + filepath;
      }))
    .pipe(gulp.dest("./docs/"));
});

gulp.task('build',['deletedocsFolder','optimizeImages','usemin','copyGeneralFiles']);