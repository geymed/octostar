var gulp = require('gulp');

var minifyHTML = require('gulp-minify-html');

var paths = require('../config/paths');


gulp.task('html-one-time', function() {
  var opts = {
    comments: true,
    spare: true
  };

  gulp.src(paths.index.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.index.dest))

  gulp.src(paths.login.src)
    .pipe(gulp.dest(paths.login.dest))


  gulp.src(paths.partials.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.partials.dest))

  gulp.src(paths.layouts.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.layouts.dest))
});