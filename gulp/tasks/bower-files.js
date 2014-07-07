var gulp = require('gulp');
var bowerFiles = require('gulp-bower-files');

var paths = require('../config/paths');


gulp.task('bowerFiles', function() {
  bowerFiles().pipe(gulp.dest(paths.bowerCopy.dest))
});