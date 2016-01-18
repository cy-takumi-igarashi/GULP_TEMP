var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = {
  'scss': './scss/',
  'src_css': './src/css/',
  'js': './js/',
  'src_js': './src/js/'
}

/* cssを整形 */
gulp.task('sass', function(){
  gulp.src(path.scss + '*.scss')
  .pipe($.plumber())
  .pipe($.compass({
    config_file: 'config.rb',
    output_style: ':compressed',
    comments: false,
    css: path.src_css,
    sass: path.scss
  }))
  .on('error', function(err) {
    console.log(err.message);
  })
  .pipe($.cssnext())
  .pipe(gulp.dest(path.src_css))
});

/* jsを整形 */
gulp.task('concat', function(){
  gulp.src(path.js + '*.js')
  .pipe($.concat('app.js'))
  .pipe(gulp.dest(path.src_js))
});

gulp.task('uglify', function(){
  gulp.src(path.src_js + 'app.min.js')
  .pipe($.uglify())
  .pipe(gulp.dest(path.src_js))
});

/* Tasks */
gulp.task('js', ['concat', 'uglify'])
gulp.task('css', ['sass']);
gulp.task('pre-commit', ['css', 'js']);

/* watch項目 */
gulp.task('watch', ['css', 'js'], function(){
  gulp.watch(path.scss + '*.scss', ['css']);
  gulp.watch(path.js + '*.js', ['js']);
});

/* default設定 */
gulp.task('default', ['watch']);