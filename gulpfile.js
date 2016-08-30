var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    nunjucks    = require('gulp-nunjucks-render'),
    data        = require('gulp-data'),
    prettify    = require('gulp-prettify'),
    path        = require('path'),
    ts          = require('gulp-typescript'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps');

var paths = {
    nunjucks: {
        src: ['src/nunjucks/pages/**/*.+(html|nunjucks)'],
        built: 'built',
        watch: 'src/nunjucks/**/*.+(html|nunjucks)',
        data: './src/nunjucks/data/',
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
        src: ['src/images/**/*', '!src/images/**/*.svg'],
        built: 'built/assets/images'
    } 
};

gulp.task('default', ['compile', 'watch', 'serve']);

gulp.task('compile', ['nunjucks', 'sass', 'typescript']);

gulp.task('serve', function () {
    browserSync.init({
        server: paths.nunjucks.built
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.nunjucks.watch, ['nunjucks', browserSync.reload]);
    gulp.watch(paths.sass.watch, ['sass', browserSync.reload]);
    gulp.watch(paths.typescripts.watch, ['typescript', browserSync.reload]);
});

gulp.task('nunjucks', function() { // http://zellwk.com/blog/nunjucks-with-gulp/
    return gulp.src(paths.nunjucks.src)
        .pipe(data(function(file) {
            return require(paths.nunjucks.data+path.basename(file.path, '.nunjucks')+'.json')
        }))
        .pipe(nunjucks({
            path: paths.nunjucks.partials
        }))
        .pipe(prettify({
            indent_size: 4,
            unformatted: ['pre', 'code']
        }))
        .pipe(gulp.dest(paths.nunjucks.built))
});

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.sass.built))
        .pipe(browserSync.stream());
});

gulp.task('typescript', function () {
    return gulp.src(paths.typescripts.src)
        .pipe(ts({
            noImplicitAny: true,
            out: 'main.js'
        }))
        .pipe(gulp.dest(paths.typescripts.built));
});