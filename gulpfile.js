/**
================
  DEPENDENCIES
================
**/

var gulp = require('gulp'),
    gutil = require('gulp-util');
    
    /*
    
    Need modules for:
      sass preprocessing
      minify css
      delete files
      copy files
      minify html
      browserify
      minify js (angularmin?)
    
    */


/**
====================
  PATH DEFINITIONS
====================
**/

var source = {
  BASE:'./src',
  html:{
    index: this.BASE+'/html/index.html',
    templates:this.BASE+'/html/templates/**/*.html'
  }
  sass:this.BASE+'/scss/main.scss',
  js:this.BASE+'/js/app.js',
  assets:this.BASE+'/assets/**/*'
};

var temp = {
  BASE:'./temp',
  html:{
    templates:this.BASE+'/html/templates'
  }
  sass:this.BASE+'/scss',
  js:this.BASE+'/js',
};

var dest = {
  BASE:'./build',
  html:{
    index: this.BASE+'/index.html',
    templates:this.BASE+'/html/templates'
  }
  sass:this.BASE+'/css/main.css',
  js:this.BASE+'/js/main.js',
  assets:this.BASE+'/**/*'
};


/**
==================
  INTERNAL TASKS
==================
**/

/* SASS preprocess local CSS */

/* Minify local CSS (+cleanup)*/

/* Copy lib CSS */

/* minify/copy index HTML (+cleanup) */

/* minify/copy template HTML (+cleanup) */

/* browserify/minify local JS (+cleanup) */

/* copy lib JS */

/* copy any assets (images, fonts, etc.) */


/**
================
  CLI COMMANDS
================
**/

/* Default Task - Development */
gulp.task('default', ['pre-process'], function(){
  
});
/* Build Task - Deployment */
