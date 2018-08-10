const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const  connect = require('gulp-connect');

gulp.task('default', ['watch', 'sass','browser-sync']);

gulp.task('watch', function(){
        gulp.watch('./src/*.scss' ,['sass']);
	gulp.watch("src/*.html", ['bs-reload']);
	gulp.watch("src/*.css", ['bs-reload']);
	gulp.watch("src/*.js", ['bs-reload']);
    });

gulp.task('sass', function () {
        gulp.src('./src/*.scss')
            .pipe(sass().on('error', sass.logError))
     	    .pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>") //<-
			    }))
            .pipe(autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
	    .pipe(connect.reload())
            .pipe(gulp.dest('./src'));
    });

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
		    baseDir: "src",
			index: "./index.html"
			}
	    });
    });

gulp.task('bs-reload', function () {
	browserSync.reload();
    });

