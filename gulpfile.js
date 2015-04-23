var gulp    = require('gulp');
var jade    = require('gulp-jade');
var stylus  = require('gulp-stylus');
var merge   = require('merge-stream');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');
var minifycss     = require('gulp-minify-css');
var connect       = require('gulp-connect');


gulp.task('jade', function () {
  var YOUR_LOCALS = {};
  gulp.src('./examples/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
      }))
    .pipe(gulp.dest('./examples'))
    .pipe(connect.reload());
});

gulp.task('stylus', function () {
  var dist = gulp.src('./src/stylus/pure-css-icons.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());

  var examples = gulp.src('./examples/stylus/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./examples/css'))
    .pipe(connect.reload());

  return merge(dist, examples);

});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./examples/*.jade'], ['jade']);
  gulp.watch(['./src/stylus/*.styl'], ['stylus']);
  gulp.watch(['./examples/stylus/*.styl'], ['stylus']);

});

gulp.task('default', ['jade', 'stylus', 'connect', 'watch']);
gulp.task('build', ['jade', 'stylus']);
