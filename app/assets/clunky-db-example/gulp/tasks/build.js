//Gulp build (copy, minify, optimize images tasks)
var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('deleteDocsFolder',function(){
    return del("./docs");
});
gulp.task('deletePublicFolder',function(){
    return del("./app/assets/server/public/*");
});

gulp.task('copyGeneralFiles', ['deleteDocsFolder'],function(){
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/client/scripts/*',
        '!./app/assets/client/scripts/**/*',
        '!./app/assets/client/images/**',
        '!./app/assets/client/styles/**',
        '!./app/temp',
        '!./app/assets/server',
        '!./app/assets/server/**',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deleteDocsFolder'],function() {
    return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
    .pipe(imageMin({
        progressive: true,
        interlaces: true,
        multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['deleteDocsFolder','deletePublicFolder', 'css','scripts'],function(){
    return gulp.src(["./app/assets/server/views/home.html","./app/assets/server/views/sensor.html","./app/assets/server/views/viewData.html","./app/assets/server/views/schedule.html","./app/assets/server/views/partNumberGen.html"])
    .pipe(usemin({
        css: [function(){return rev();}],
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(gulp.dest("./app/assets/server/public/"));
});

gulp.task('build',['copyGeneralFiles', 'deletePublicFolder','usemin','scripts']);