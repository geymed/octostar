var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

var paths = require('../config/paths');

gulp.task('styles', function() {
  gulp.src(paths.watch.styles)
    .pipe(watch(function(files) {
      return gulp.src(paths.scss.src).pipe(sass())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.scss.dest));
    }));
});