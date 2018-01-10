//Gulp build (copy, minify, optimize images tasks)
var gulp = require('gulp'),
argv = require('yargs').argv,
browserSync = require('browser-sync').create(),
imageMin = require('gulp-imagemin'),
changed = require('gulp-changed'),
del = require('del'),
print = require('gulp-print'),
rev = require('gulp-rev'),
taskTime = require('gulp-total-task-time'),
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin');

taskTime.init();
gulp.task('deleteDocsFolder',function(){
    
    if(!!argv.d){
        
        return del("./docs");
    } else {
        var pathsToDel = ["./docs/assets/styles","./docs/assets/scripts"];
        return del(pathsToDel);
    }
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
    console.log("Checking which files changed: ");
    return gulp.src(pathsToCopy)
    .pipe(changed("./docs"))
    .pipe(print(function(filePath) {
        return "Copying: " + filePath;
      }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deleteDocsFolder','deletePublicFolder','usemin'],function() {
    if(!!argv.i){
        return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
        .pipe(changed("./docs"))
        .pipe(print(function(filePath) {
            return "minifying: " + filePath;
            }))
        .pipe(imageMin({
            progressive: true,
            interlaces: true,
            multipass: true
        }))
        .pipe(print(function(filePath) {
            return "Copying image: " + filePath;
            }))
        .pipe(gulp.dest("./app/assets/server/public/images"));
    } else {
        return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
        .pipe(print(function(filePath) {
            return "Copying image: " + filePath;
          }))
        .pipe(gulp.dest("./app/assets/server/public/images"));
    }

});

gulp.task('usemin',['deleteDocsFolder','deletePublicFolder', 'css','scripts'],function(){
    if(!!argv.cu){
    return gulp.src(
        [
            "./app/assets/server/views/script.html",
            "./app/assets/server/views/styles.html",
        ])
    .pipe(usemin({
        css: [function(){return rev();}],
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(print(function(filePath) {
        return "code built: " + filePath;
      }))
    .pipe(gulp.dest("./app/assets/server/views/temp/"));
    } else {
        //If only I could do this. Instead I'll use template inheritance
        return gulp.src([
        "./app/assets/server/views/addDataPoint.html",
        "./app/assets/server/views/arduinoConfig.html",
        "./app/assets/server/views/base.html",
        "./app/assets/server/views/error_template.html",
        "./app/assets/server/views/home.html",
        "./app/assets/server/views/inProgress.html",
        "./app/assets/server/views/partNumberGen.html",
        "./app/assets/server/views/product.html",
        "./app/assets/server/views/schedule.html",
        "./app/assets/server/views/sensor.html",
        "./app/assets/server/views/viewData.html",
    ])
        .pipe(changed("./app/assets/server/public/"))
        .pipe(print(function(filePath) {
            return "template copied: " + filePath;
          }))
        .pipe(gulp.dest("./app/assets/server/public/"));
    }

});

gulp.task('build',['copyGeneralFiles', 'deletePublicFolder','usemin','scripts','optimizeImages']);