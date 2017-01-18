const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const run = require('gulp-run');
const cleanCSS = require('gulp-clean-css');
const cleanHtml = require('gulp-cleanhtml');

gulp.task('npm', function (cb) {
    gulp.src([
        'package.json'
    ])
    .pipe(gulp.dest('dist'));

    return run('cd dist && npm install --production')
        .exec();
});

gulp.task('html', function(cb) {
    gulp.src([
        'src/client/*.html'
    ])
    .pipe(cleanHtml())
    .pipe(gulp.dest('dist/client'));

    cb();
});

gulp.task('css', function(cb) {
    gulp.src([
        'src/client/css/*',
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/client/css'));

    cb();
});

gulp.task('images', function(cb) {
    gulp.src([
        'src/client/images/**/*'
    ])
    .pipe(gulp.dest('dist/client/images'));

    cb();
});


gulp.task('js:client', function(cb) {

    var clientBundler = browserify({
        entries: ['src/client/js/app.js'],
        debug: true
    });
    clientBundler.transform(babelify);
    clientBundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/client/js'));

    var mobileBundler = browserify({
        entries: ['src/client/js/mobile.js'],
        debug: true
    });
    mobileBundler.transform(babelify);
    mobileBundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('mobile.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/client/js'));

    cb();
});

gulp.task('js:server', function (cb) {

    gulp.src(['src/server/**/*'])
        .pipe(gulp.dest('dist/server'));

    gulp.src(['src/*.js'])
        .pipe(gulp.dest('dist'));

    cb();
});

gulp.task('sounds', function (cb) {
    gulp.src([
        'src/client/sounds/*'
    ])
    .pipe(gulp.dest('dist/client/sounds'));

    cb();
});


gulp.task('build', ['js:server', 'js:client', 'css', 'html', 'images', 'sounds']);

gulp.task('default', ['build']);

gulp.task('watch', ['default'], function () {

    gulp.watch(['src/client/css/**/*'], ['css']);
    gulp.watch(['src/client/images/**/*'], ['images']);
    gulp.watch(['src/client/js/**/*'], ['js:client']);
    gulp.watch(['src/client/*.html'], ['html']);
    gulp.watch(['src/client/sounds/*'], ['sounds']);

    gulp.watch([
        'src/*.js',
        'src/server/**/*'
    ], ['js:server']);

});
