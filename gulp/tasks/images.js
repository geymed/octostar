var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

var paths = require('../config/paths');


gulp.task('images', function() {
  return gulp.src(paths.images.src)
  // Pass in options to the task
  .pipe(imagemin({
    optimizationLevel: 5
  }))
    .pipe(gulp.dest(paths.images.dest));
});