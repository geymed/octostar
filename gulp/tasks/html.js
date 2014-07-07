var gulp = require('gulp');
var watch = require('gulp-watch');

var paths = require('../config/paths');

gulp.task('html', function() {
  gulp.src(paths.watch.html)
    .pipe(watch(function(files) {
      gulp.src(paths.index.src)
        .pipe(gulp.dest(paths.index.dest))

      gulp.src(paths.partials.src)
        .pipe(gulp.dest(paths.partials.dest))

      gulp.src(paths.layouts.src)
        .pipe(gulp.dest(paths.layouts.dest))
    }));
});