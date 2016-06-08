var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    pug         = require('gulp-pug'),
    fs          = require('fs'),
    data        = require('gulp-data'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    maps        = require('gulp-sourcemaps'),
    imagemin    = require('gulp-imagemin'),
    gutil       = require('gulp-util'),
    premailer   = require('gulp-premailer');

var paths = {

  // Directories
  input:   './src',
  preview: './src/compiled',
  output:  './dist',

  // Templates
  templates: {
    pug:    './src/templates/*.pug',
    markup: './src/compiled/*.html'
  },

  // Images
  images: {
    input:   './src/img/*',
    preview: './src/compiled/img',
    output:  './dist/img',
  },

  // Data
  data: './src/json/data.json',

  // Stylesheets
  styles: {
    input: 'src/**/*.scss',
    main:  './src/scss/mailchute.scss'
  }
};

// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;
var ERROR_LEVELS = ['error', 'warning'];

function isFatal(level) {
  return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

function handleError(level, error) {
  gutil.log(error.message);
  if (isFatal(level)) {
    process.exit(1);
  }
}

function onError(error) { handleError.call(this, 'error', error);}
function onWarning(error) { handleError.call(this, 'warning', error);}


gulp.task('default', ['images', 'browser-sync', 'watch']);

// Watch task
gulp.task('watch', function() {
  fatalLevel = fatalLevel || 'off';
  gulp.watch(paths.styles.input, ['styles']);
  gulp.watch(paths.templates.pug, ['templates']);
});

// Browser-sync task
gulp.task('browser-sync', ['templates', 'styles'], function() {
  browserSync({
    server: {
      baseDir: paths.preview
    }
  });
});

var dataConfig = function(file) {
  return { "data": JSON.parse(fs.readFileSync(paths.data))};
};

// Compile Pug files to HTML
gulp.task('templates', function() {
  return gulp.src(paths.templates.pug)
    .pipe(data(dataConfig))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.preview))
    .pipe(browserSync.reload({ stream:true }))
    .pipe(premailer())
    .pipe(gulp.dest(paths.output))
    .on('error', onWarning);
});

// Compile SCSS to CSS
gulp.task('styles', function () {
  return sass (paths.styles.main, { sourcemap: true })
    .pipe(maps.write())
    .pipe(prefix("last 2 versions"))
    .pipe(gulp.dest(paths.preview))
    .pipe(browserSync.reload({ stream:true }))
    .on('error', onWarning);
});

// Optimize images
gulp.task('images', function() {
  return gulp.src(paths.images.input)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.preview))
    .pipe(gulp.dest(paths.images.output))
    .on('error', onWarning);
});
