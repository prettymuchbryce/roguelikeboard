var less = require('gulp-less');
var uglify = require('gulp-uglify');
var path = require('path');
var gulp = require('gulp'); 
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;
var react = require('gulp-react');

var scripts = [
    './demo/static/js/browserify-scripts.js'
];

var styles = [
    './demo/client/vendor/css/bootstrap.min.css',
    './demo/static/main.css'
];

gulp.task('delete-static', function() {
    return gulp.src('./demo/static/', { read: false }) // much faster
        .pipe(rimraf());
});

gulp.task('create-static', ['delete-static'], function(callback) {
    return mkdirp('./demo/static/js', function(error) {
        callback();
    });
});

gulp.task('css', ['clean', 'less'], function() {
    return gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./demo/static/'));
});

gulp.task('less', ['clean'], function () {
    return gulp.src('./demo/client/less/**/*.less')
    .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./demo/static/'));
});

gulp.task('scripts', ['browserify'], function() {
    return gulp.src(scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./demo/static/js/'));
});

gulp.task('browserify', ['clean'], function(cb) {
   return exec('browserify -t reactify -e ./demo/client/src/app.js -o ./demo/static/js/browserify-scripts.js', function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(error);
    });
});

gulp.task('npm-build', function () {
    return gulp.src('./src/roguelikeboard.jsx')
        .pipe(react())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('clean', ['delete-static', 'create-static']);

gulp.task('build', ['clean', 'browserify', 'scripts', 'less', 'css']);

gulp.task('watch', function() {
    gulp.watch(['./demo/client/**/*'], ['build'])
});

gulp.task('default', ['build', 'watch']);