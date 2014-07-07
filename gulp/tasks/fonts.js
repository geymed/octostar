var gulp = require('gulp');

var paths = require('../config/paths');

gulp.task('fonts', function() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});