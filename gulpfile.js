var gulp      = require('gulp'),
    ts        = require('gulp-typescript'),
    sass      = require('gulp-sass');

var paths = {
    typescripts: {
        src: ['src/typescript/**/*.ts', '!src/typescript/**/_*.ts'],
        built: './built/js'
    },
    sass: {
        src: ['src/scss/**/*.scss', '!src/scss/**/_*.scss'],
        built: './built/css'
    },    
    images: {
        src: ['src/images/**/*', '!src/images/**/*.svg']
    } 
};

gulp.task('default', ['compile', 'watch']);

gulp.task('compile', ['sass', 'typescript']);

gulp.task('watch', function() {
    gulp.watch(paths.sass.src,  { usePolling: true }, ['sass']);
    gulp.watch(paths.typescripts.src, ['typescript']);
});

gulp.task('sass', function () {
    gulp.src(paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.built));
});

gulp.task('typescript', function () {
    return gulp.src(paths.typescripts.src)
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest(paths.typescripts.built));
});