var elixir = require('laravel-elixir');
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  del = require('del'),
  concat = require('gulp-concat');
var strip = require('gulp-strip-comments');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var dist = 'public';

elixir.config.publicDir = dist;
elixir.config.publicPath = dist;

elixir(function(mix) {
  mix.task('default');
});

gulp.task('clean', function() {
    return del([dist + '/app', dist + '/assets'], {force: true});
});

gulp.task('default', ['clean'], function() {
  gulp.start('vendor', 'html', 'scripts', 'img','scss');
});


gulp.task('watch', function() {

  gulp.watch('resources/assets/vendor/**/*', { interval: 750 }, ['vendor']);
  gulp.watch('resources/app/vendor/**/*', { interval: 750 }, ['vendor']);

  gulp.watch('resources/assets/js/**/*.js', { interval: 750 }, ['scripts']);
  gulp.watch('resources/app/**/*.js', { interval: 750 }, ['scripts']);
	gulp.watch('resources/app/**/*.html', { interval: 750 }, ['scripts']);

  gulp.watch('resources/assets/scss/**/*.scss', { interval: 750 }, ['scss']);

  gulp.watch('src/**/*.html', { interval: 750 }, ['html']);

});

gulp.task('html', function() {

  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))

});

gulp.task('scripts', function() {

  /*
   *  Assets
   */
  gulp.src('resources/assets/js/*.js')
  .pipe(concat('main.js'))
  .pipe(strip())
  .pipe(gulp.dest(dist + '/assets/js'))

  /*
   *  App
   */

  // Env
  gulp.src('resources/app/env.js')
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app'))

	gulp.src('resources/app/env.prod.js')
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app'))

  // App
  gulp.src('resources/app/app.js')
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app'))

  // Components
  gulp.src('resources/app/components/**/*.js')
  .pipe(concat('components.js'))
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app/'))

  gulp.src('resources/app/components/**/*.html')
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app/components'))

  // Directives
  gulp.src('resources/app/directives/**/*.js')
  .pipe(concat('directives.js'))
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app/'))

  gulp.src('resources/app/directives/**/*.html')
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app/directives'))

  // Factories
  gulp.src('resources/app/factories/**/*.js')
  .pipe(concat('factories.js'))
  .pipe(strip())
  .pipe(gulp.dest(dist + '/app/'))

});

gulp.task('scss', function(){
  gulp.src('resources/assets/scss/fonts/*')
  .pipe(gulp.dest(dist+'/assets/css/fonts'))

  return gulp.src('resources/assets/scss/main.scss')
  .pipe(sass())
  .pipe(gulp.dest(dist + '/assets/css'))
})

gulp.task('img', function() {

    gulp.src('resources/assets/img/*')
        .pipe(gulp.dest(dist + '/assets/img'))

});

gulp.task('vendor', function() {

  /*
   *  jQuery
   */

  gulp.src('resources/assets/vendor/jquery/jquery.min.js')
  .pipe(gulp.dest(dist + '/assets/vendor/jquery'))

  /*
   *  Bootstrap
   */

  // CSS
  var bootstrap_css = [
    'resources/assets/vendor/bootstrap/css/bootstrap.min.css',
    'resources/assets/vendor/bootstrap/css/bootstrap.simplex.min.css'
  ];

  gulp.src(bootstrap_css)
  .pipe(concat('bootstrap.min.css'))
  .pipe(gulp.dest(dist + '/assets/vendor/bootstrap/css'))

	// Fonts
	gulp.src('resources/assets/vendor/bootstrap/fonts/*')
  .pipe(gulp.dest(dist + '/assets/vendor/bootstrap/fonts'))

  // JS
  gulp.src('resources/assets/vendor/bootstrap/js/bootstrap.min.js')
  .pipe(concat('bootstrap.min.js'))
  .pipe(gulp.dest(dist + '/assets/vendor/bootstrap/js'))

  /*
   *  Angular
   */

  var angular = [
    'resources/app/vendor/angular.min.js',
    'resources/app/vendor/angular-animate.min.js',
    'resources/app/vendor/angular-cookies.min.js',
    'resources/app/vendor/angular-resource.min.js',
    'resources/app/vendor/angular-route.min.js',
    'resources/app/vendor/angular-sanitize.min.js',
    'resources/app/vendor/angular-touch.min.js',
    'resources/app/vendor/ui-bootstrap-2.2.0.min.js',
    'resources/app/vendor/ui-codemirror.min.js',
    'resources/app/vendor/moment.min.js',
    'resources/app/vendor/angular-moment.min.js'
  ];

  gulp.src(angular)
  .pipe(concat('angular.min.js'))
  .pipe(gulp.dest(dist + '/app/vendor/angular'))

  /*
   *  metisMenu
   */

  // CSS
  gulp.src('resources/assets/vendor/metisMenu/metisMenu.min.css')
  .pipe(gulp.dest(dist + '/assets/vendor/metisMenu'))

  // JS
  gulp.src('resources/assets/vendor/metisMenu/metisMenu.min.js')
  .pipe(gulp.dest(dist + '/assets/vendor/metisMenu'))

  /*
   *  Font Awesome
   */

  // CSS
  gulp.src('resources/assets/vendor/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest(dist + '/assets/vendor/font-awesome/css'))

  // Fonts
  gulp.src('resources/assets/vendor/font-awesome/fonts/*')
  .pipe(gulp.dest(dist + '/assets/vendor/font-awesome/fonts'))

  /*
   *  Code Mirror
   */

  // JS
  var codemirror_js = [
    'resources/assets/vendor/CodeMirror-5.21.0/lib/codemirror.js',
    'resources/assets/vendor/CodeMirror-5.21.0/mode/javascript/javascript.js',
    'resources/assets/vendor/CodeMirror-5.21.0/addon/selection/active-line.js',
    'resources/assets/vendor/CodeMirror-5.21.0/addon/edit/closebrackets.js',
    'resources/assets/vendor/CodeMirror-5.21.0/addon/edit/matchbrackets.js',
    'resources/assets/vendor/CodeMirror-5.21.0/addon/display/autorefresh.js'
  ];

  gulp.src(codemirror_js)
  .pipe(concat('codemirror.min.js'))
  .pipe(gulp.dest(dist + '/assets/vendor/codemirror'))

  // CSS
  var codemirror_css = [
    'resources/assets/vendor/CodeMirror-5.21.0/lib/codemirror.css',
    'resources/assets/vendor/CodeMirror-5.21.0/theme/monokai.css'
  ];

  gulp.src(codemirror_css)
  .pipe(concat('codemirror.min.css'))
  .pipe(gulp.dest(dist + '/assets/vendor/codemirror'))

  /*
   *  Libs diverses
   */

  var tools = [
    'resources/app/vendor/Blob.js',
    'resources/app/vendor/esprima.js',
    'resources/app/vendor/FileSaver.min.js',
    'resources/app/vendor/underscore.min.js',
    'resources/app/vendor/papaparse.min.js'
  ];

  gulp.src(tools)
  .pipe(concat('tools.min.js'))
  .pipe(gulp.dest(dist + '/app/vendor/tools'))

});
