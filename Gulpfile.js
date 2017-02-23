var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var jslint = require('gulp-jslint');
var cssmin = require('gulp-cssmin');
var beautify = require('gulp-beautify');
 
/*gulp.task('beautify', function() {
  gulp.src('./src/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./public/'))
});*/

gulp.task('js-minification', function() {
    gulp.src('src/js/*.js')
        // pass your directives 
        // as an object 
        .pipe(jslint({
            // these directives can 
            // be found in the official 
            // JSLint documentation. 
            node: true,
            evil: true,
            nomen: true,

            // you can also set global 
            // declarations for all source 
            // files like so: 
            global: [],
            predef: [],
            // both ways will achieve the 
            // same result; predef will be 
            // given priority because it is 
            // promoted by JSLint 

            // pass in your prefered 
            // reporter like so: 
            reporter: 'default',
            // ^ there's no need to tell gulp-jslint 
            // to use the default reporter. If there is 
            // no reporter specified, gulp-jslint will use 
            // its own. 

            // specifiy custom jslint edition 
            // by default, the latest edition will 
            // be used 
            edition: '2014-07-08',

            // specify whether or not 
            // to show 'PASS' messages 
            // for built-in reporter 
            errorsOnly: false
        }))
        .on('error', function(error) {
            console.error(String(error));
        })
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('des/js'));


});

gulp.task('css-minification', function() {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(concat('all.css.min'))
        .pipe(gulp.dest('des/css'));


});

//path to listen file changes
var paths = {
    scripts: ['src/js/*.js'],
    styles: ['src/css/*.css']
};

// Rerun the task when a file changes 
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js-minification']);
    gulp.watch(paths.styles, ['css-minification']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['js-minification', 'css-minification'], function() {
    console.log("minification is completed");
});
