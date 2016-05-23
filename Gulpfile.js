const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('uglify', function() {

    var clientBundler = browserify({
        entries: ['client/js/app.js'],
        debug: true
    });
    clientBundler.transform(babelify);
    clientBundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));

    var mobileBundler = browserify({
        entries: ['client/js/mobile.js'],
        debug: true
    });
    mobileBundler.transform(babelify);
    mobileBundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('mobile.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));

});

gulp.task('copy', function () {
    return gulp.src(['client/**/*', '!client/js/**/*'])
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['copy', 'uglify']);

gulp.task('default', ['build']);

gulp.task('watch', ['default'], function () {
    gulp.watch(['./src/**/*'], ['build']);
});
