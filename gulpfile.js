'use strict';

/* jshint node: true */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var bowerFiles = require('main-bower-files');

var jsFiles = ['gulpfile.js','app/app.js','app/services/*.js', 'app/controllers/*.js'];

gulp.task('style', function(){
   return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe(jscs());
});

gulp.task('inject', function(){
   var wiredep = require('wiredep').stream;
   var inject = require('gulp-inject');

   var injectSrc = gulp.src(['./app/assets/css/*.css', './app/app.js','./app/services/*.js', './app/controllers/*.js'],{read: false});
   var injectOptions = {
     ignorePath: 'app/',
     addRootSlash: false
   };

   var options = {
        bowerJson: require('./bower.json'),
        directory: 'app/bower_components'
   };

   return gulp.src('./app/index.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./app'));
});

gulp.task('lib', function(){
  return gulp.src(bowerFiles(),{ base: './app/bower_components'})
    .pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('js', function(){
  return gulp.src(['./app/**/*.js', '!bower_components/*'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function(){
  return gulp.src('./app/assets/**')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('template', function(){
  var YOUR_LOCALS = {};
 
  return gulp.src('./app/**/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('jade-watch', ['style', 'inject', 'js', 'lib', 'css', 'template'], browserSync.reload);


gulp.task('serve', ['style', 'inject','js', 'lib', 'css', 'template'], function(){
  browserSync.init({
    ghostMode: false,
    port: process.env.PORT || 3000,
    server:{
      baseDir: './dist'
    }
  });
  gulp.watch(['gulpfile.js','app/app.js','app/services/*.js', 'app/controllers/*.js', './app/**/*.jade'], ['jade-watch']);
});
