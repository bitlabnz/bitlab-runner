var gulp = require('gulp');
var server = require('gulp-server-livereload');
 
gulp.task('serve', function() {
  gulp.src('src')
    .pipe(server({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['serve']);