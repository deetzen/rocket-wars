const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('copy', function () {
    return gulp.src(['client/**/*', '!client/js/**/*'])
        .pipe(gulp.dest('public'));
});

gulp.task('transpile', function () {
    return browserify('client/js/app.js')
        .transform('babelify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['copy', 'transpile']);

gulp.task('default', ['build']);

gulp.task('watch', ['default'], function () {
    gulp.watch(['./src/**/*'], ['build']);
});
