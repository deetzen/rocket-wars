const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const webserver = require('gulp-webserver');


gulp.task('copy', function () {
    return gulp.src(['src/**/*', '!src/js/**/*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('transpile', function () {
    return browserify('src/js/app.js')
        .transform('babelify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: 'index.html'
        }));
});


gulp.task('build', ['copy', 'transpile']);

gulp.task('default', ['build']);

gulp.task('watch', ['default'], function () {
    gulp.watch(['./src/**/*'], ['build']);
});
