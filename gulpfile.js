var gulp      = require('gulp'),
    ts        = require('gulp-typescript');

gulp.task('default', ['compile', 'watch']);

gulp.task('compile', ['typescript']);

gulp.task('watch', function() {
    gulp.watch('src/typescript/**/*.ts', ['typescript']);
});

gulp.task('typescript', function () {
    return gulp.src('src/typescript/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('built/js'));
});