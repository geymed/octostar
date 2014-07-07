var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = require('../config/paths');


gulp.task('js', function() {
  gulp.src(paths.watch.js)
    .pipe(watch(function(files) {
      gulp.src(paths.scripts.src)
        .pipe(concat(paths.scripts.dest))
        .pipe(gulp.dest(paths.scripts.dir));

      gulp.src(paths.scripts.fullDir)
        .pipe(uglify({
          outSourceMap: false
        }))
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest(paths.scripts.dir));
    }));
});