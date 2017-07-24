var gulp = require('gulp');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var sass = require("gulp-sass");
var scss = require("gulp-scss");

gulp.task('css', function() {
	return gulp.src('./comp/scss/*.css')
		.pipe(concat('build.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function(cb) {
	pump([
		gulp.src('./comp/js/*.js'),
			concat('build.js'),
			uglify(),
			gulp.dest('./dist/js/')
		],
		cb);
});

gulp.task('scss', function () {
  	return gulp.src('./comp/scss/foundation.scss')
    	.pipe(sass().on('error', sass.logError))
		.pipe(concat('build.css'))
		.pipe(uglifycss())
    	.pipe(gulp.dest('./dist/css/'));
});

// static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
 
   	gulp.watch("./*.html").on('change', browserSync.reload);
});

// css sync
gulp.task('css-sync', function () {
   	gulp.watch('./comp/scss/*.scss', ['scss']);
});
