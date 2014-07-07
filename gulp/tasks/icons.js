var gulp = require('gulp');

var paths = require('../config/paths');

gulp.task('icons', function() {
  return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest));
});