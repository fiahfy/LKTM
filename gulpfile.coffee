gulp = require 'gulp'
del = require 'del'
runSequence = require 'run-sequence'
plugins = do require 'gulp-load-plugins'

gulp.task 'bower', ->
  plugins.bower()
  .pipe gulp.dest 'app/libs'

gulp.task 'clean', (callback) ->
  del ['dist', 'dist.zip'], callback

gulp.task 'copy', ->
  gulp.src 'app/**'
  .pipe gulp.dest 'dist'

gulp.task 'usemin', ->
  gulp.src 'dist/html/*.html'
  .pipe plugins.usemin({
    css: [plugins.minifyCss()]
    html: [plugins.minifyHtml()]
    js: [plugins.uglify()]
  })
  .pipe gulp.dest 'dist/html'

gulp.task 'header', ->
  gulp.src ['dist/css/**/*.css', 'dist/js/**/*.js'], {base: 'dist'}
  .pipe plugins.header [
    '/**'
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */'
    ''
  ].join('\n'), {pkg: require './package.json'}
  .pipe gulp.dest 'dist'

gulp.task 'build', (callback) ->
  runSequence(
    'bower'
    'clean'
    'copy'
    'usemin'
    'header'
    callback
  )

gulp.task 'zip', ->
  gulp.src 'dist'
  .pipe plugins.zip 'dist.zip'
  .pipe gulp.dest '.'

gulp.task 'default', ['bower'], ->
