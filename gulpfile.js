var gulp     = require('gulp'),
    ts       = require('gulp-typescript'),
    sass     = require('gulp-sass'),
    nunjucks = require('gulp-nunjucks-render');

var paths = {
    nunjucks: {
        src: ['src/nunjucks/pages/**/*.+(html|nunjucks)'],
        built: 'built',
        watch: 'src/nunjucks/**/*.+(html|nunjucks)',
        partials: 'src/nunjucks/partials'
    },
    typescripts: {
        src: ['src/typescript/**/*.ts', '!src/typescript/**/_*.ts'],
        built: 'built/assets/js',
        watch: 'src/typescript/**/*.ts'
    },
    sass: {
        src: ['src/scss/**/*.scss', '!src/scss/**/_*.scss'],
        built: 'built/assets/css',
        watch: ''
    },    
    images: {
        src: ['src/images/**/*', '!src/images/**/*.svg']
    } 
};

gulp.task('default', ['compile', 'watch']);

gulp.task('compile', ['nunjucks', 'sass', 'typescript']);

gulp.task('watch', function() {
    gulp.watch(paths.nunjucks.watch, ['nunjucks']);
    gulp.watch(paths.sass.watch, ['sass']);
    gulp.watch(paths.typescripts.watch, ['typescript']);
});

gulp.task('nunjucks', function() {
    return gulp.src(paths.nunjucks.src)
        .pipe(nunjucks({
            path: paths.nunjucks.partials
        }))
        .pipe(gulp.dest(paths.nunjucks.built))
});

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.built));
});

gulp.task('typescript', function () {
    return gulp.src(paths.typescripts.src)
        .pipe(ts({
            noImplicitAny: true,
            out: 'main.js'
        }))
        .pipe(gulp.dest(paths.typescripts.built));
});