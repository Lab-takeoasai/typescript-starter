var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var nodeCLI = require("shelljs-nodecli");
var webpack = require('gulp-webpack');
var config = require('./webpack.config.js');
var karma = require('karma').server;
var del = require('del');
var argv = require('yargs')
  .option('env', { alias: 'e', describe: 'debug or release' })
  .option('target', { alias: 't', describe: 'ios or android' }).argv;

var paths = {
  sass: ['./scss/**/*.scss'],
  typescript: ['./src/**/*.ts']
};

gulp.task('clean', function () {
  del(['www/js/*.js', 'www/css/*.css', 'plugins', 'platforms', 'node_modules'])
});

gulp.task('default', ['sass', 'webpack']);

gulp.task('webpack', function () {
  gulp.src(paths.typescript)
    .pipe(webpack(config))
    .pipe(gulp.dest('./'));
});

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  });
});

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

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.typescript, ['webpack', 'karma']);
});

gulp.task('build', function () {
  var target = argv.target || "ios";
  var env = argv.env || "debug";
  nodeCLI.exec("ionic", "build", target);
});
gulp.task('run', function () {
  var target = argv.target || "ios";
  var env = argv.env || "debug";
  nodeCLI.exec("ionic", "run", target, " -l -c -s");
});

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
