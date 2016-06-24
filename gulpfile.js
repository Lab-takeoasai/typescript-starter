var gulp = require('gulp');
var config = require('./webpack.config.js');

var paths = {
  sass: ['./scss/**/*.scss'],
  typescript: ['./src/**/*.ts']
};

/* tasks */
gulp.task('default', ['sass', 'webpack']);
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.typescript, ['webpack']);
});

var del = require('del');
gulp.task('clean', function () {
  del(['www/js/*.js', 'www/css/*.css', 'plugins', 'platforms', 'node_modules'])
});

var webpack = require('gulp-webpack');
gulp.task('webpack', function () {
  gulp.src(paths.typescript)
    .pipe(webpack(config))
    .pipe(gulp.dest('./'));
});

var Karma = require('karma').Server;
gulp.task('karma', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }).start();
});

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

var nodeCLI = require("shelljs-nodecli");
gulp.task('build', ['webpack'], function () {
  var target = (process.env.TARGET === 'ios') ? 'ios' : 'android';
  nodeCLI.exec("ionic", "build", target, function (code, output) {
    // do after exec
  });
});
gulp.task('run', ['webpack'], function () {
  var target = (process.env.TARGET === 'ios') ? 'ios' : 'android';
  nodeCLI.exec("ionic", "run", target, "-lcs", function (code, output) {
    // do after exec
  });
});

var sh = require('shelljs');
var bower = require('bower');
var gutil = require('gulp-util');
gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
