var gulp = require('gulp');
var replacements = require('./replacements.config');
var proxies = require('./proxies.config');

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

var jsonEditor = require('gulp-json-editor');
var xmlEditor = require('gulp-xml-editor');
gulp.task('replace', function () {
  var env = {};
  replacements[process.env.ENV || 'debug'].map((value, index) => {
    env[value.search] = value.replace;
  });
  gulp.src("./config.xml")
    .pipe(xmlEditor([
      { path: '//xmlns:name', text: env["@@xmlns:name"] },
      { path: '//xmlns:access', attr: { origin: env["@@xmlns:access"] } },
      { path: '//xmlns:allow-intent', attr: { href: env["@@xmlns:allow-intent"] } },
      { path: '//xmlns:allow-navigation', attr: { href: env["@@xmlns:allow-navigation"] } },
      { path: '//xmlns:widget[@id]', attr: { id: env["@@xmlns:widget[@id]"], version: env["@@xmlns:widget[@version]"] } },
    ], 'http://www.w3.org/ns/widgets'))
    .pipe(gulp.dest("./"));

  gulp.src("./ionic.project")
    .pipe(jsonEditor({
      'proxies': proxies[process.env.ENV || 'debug']
    }))
    .pipe(gulp.dest("./"));
});

var webpack = require('gulp-webpack');
gulp.task('webpack', ['replace'], function () {
  gulp.src(paths.typescript)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

var Karma = require('karma').Server;
gulp.task('karma', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }).start();
});

var protractor = require("gulp-protractor").protractor;
gulp.task('protractor', function (done) {
  gulp.src([])
    .pipe(protractor({
      configFile: "./protractor.config.js"
    }))
    .on('error', function (e) { throw e })
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
  nodeCLI.exec("ionic", "run", target, function (code, output) {
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
