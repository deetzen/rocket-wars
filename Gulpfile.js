const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('transpile', function () {
    return browserify('./src/js/app.js')
            .transform('babelify')
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['transpile']);

gulp.task('watch', ['default'], function () {
    gulp.watch(['./src/js/**/*.js'], ['default']);    
});
