var gulp = require('gulp');

gulp.task('build', [
  'styles-one-time',
  'js-one-time',
  'html-one-time',
  'fonts', 
  'icons',
  'images',
  'lint'
]);