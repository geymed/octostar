var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var bowerFiles = require('gulp-bower-files');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var stylish = require('jshint-stylish');
var minifyHTML = require('gulp-minify-html');



var paths = {
  bowerCopy: {
    dest: 'build/assets/components'
  },

  scripts: {
    src: [
      'public_modules/components/angular/angular.js',
      'public_modules/components/angular-route/angular-route.js',
      'public_modules/js/app.js',
      'public_modules/js/**/*.js'
    ],
    fullDir: 'build/assets/js/scripts.js',
    dir: 'build/assets/js',
    dest: 'scripts.js',
    jsHint: [
      'public_modules/js/app.js',
      'public_modules/js/**/*.js'
    ]
  },
  images: {
    src: 'public_modules/assets/img/**/*',
    dest: 'build/assets/img'
  },
  icons: {
    src: 'public_modules/assets/icons/**/',
    dest: 'build'
  },
  fonts: {
    src: 'public_modules/assets/fonts/**/',
    dest: 'build/assets/fonts'
  },

  index: {
    src: 'public_modules/html/index.html',
    dest: 'build'
  },
  partials: {
    src: 'public_modules/html/partials/**/*',
    dest: 'build/partials'
  },
  layouts: {
    src: 'public_modules/html/layouts/**/*',
    dest: 'build/layouts'
  },

  scss: {
    src: 'public_modules/scss/style.scss',
    dest: 'build/assets/css'
  },

  watch: {
    styles: [
      'public_modules/scss/style.scss',
      'public_modules/scss/**/*.scss'
    ],
    js: [
      'public_modules/js/app.js',
      'public_modules/js/**/*.js'
    ],
    html: [
      'public_modules/html/**/*.html'
    ]
  }
};


/**
 * Stylesheets tasks
 */
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

/**
 * Stylesheets one time task
 */
gulp.task('styles-one-time', function() {
  return gulp.src(paths.scss.src).pipe(sass())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.scss.dest));
});

/**
 * Javascript tasks
 */
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


/**
 * Javascript one time tasks
 */
gulp.task('js-one-time', function() {
  gulp.src(paths.scripts.src)
    .pipe(concat(paths.scripts.dest))
    .pipe(gulp.dest(paths.scripts.dir));

  gulp.src(paths.scripts.fullDir)
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(paths.scripts.dir));
});

/**
 * Imagemin task
 */
gulp.task('images', function() {
  return gulp.src(paths.images.src)
  // Pass in options to the task
  .pipe(imagemin({
    optimizationLevel: 5
  }))
    .pipe(gulp.dest(paths.images.dest));
});

/**
 * font task
 */
gulp.task('fonts', function() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});
/**
 * icon task
 */
gulp.task('icons', function() {
  return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest));
});

/**
 * JSHint task
 */
gulp.task('lint', function() {
  gulp.src(paths.scripts.jsHint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('html-one-time', function() {
  var opts = {
    comments: true,
    spare: true
  };

  gulp.src(paths.index.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.index.dest))

  gulp.src(paths.partials.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.partials.dest))

  gulp.src(paths.layouts.src)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.layouts.dest))
});


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
/**
 * Bower task
 */
gulp.task('bowerFiles', function() {
  bowerFiles().pipe(gulp.dest(paths.bowerCopy.dest))
});

gulp.task('default', [
  'styles', 
  'js', 
  'html', 
  'fonts', 
  'icons'
]);

gulp.task('build', [
  'styles-one-time',
  'js-one-time',
  'html-one-time',
  'fonts', 
  'icons',
  'images',
  'lint'
]);