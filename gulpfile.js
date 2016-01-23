var gulp 		= require('gulp'),
premailer   = require('gulp-premailer'),
browserSync = require('browser-sync'),
jade 				= require('gulp-jade'),
sass 				= require('gulp-ruby-sass'),
filter 			= require('gulp-filter'),
prefix 			= require('gulp-autoprefixer'),
maps				= require('gulp-sourcemaps'),
data        = require('gulp-data');

gulp.task('default', ['browser-sync', 'watch']);

// Watch task
gulp.task('watch', function() {
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/*.jade', ['jade']);
	gulp.watch('compiled/*.html', ['build'])
});

// Browser-sync task
gulp.task('browser-sync', ['jade', 'sass'], function() {
	browserSync({
		server: {
			baseDir: './compiled'
		}
	});
});

// Jade task
gulp.task('jade', function() {
	return gulp.src('src/*.jade')
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('./compiled/'))
	.pipe(browserSync.reload({stream:true}));
});

//SASS task
gulp.task('sass', function () {
	return sass ('src/sass/core.scss', { sourcemap: true })
	.pipe(maps.write())
  .pipe(prefix("last 2 versions"))
  .pipe(gulp.dest('./compiled/'))
  .pipe(browserSync.reload({stream:true}));
});

//Premailer task
gulp.task('build', function () {
	gulp.src('./compiled/*.html')
		.pipe(premailer())
		.pipe(gulp.dest('./dist/'));
});