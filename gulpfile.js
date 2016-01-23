var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  var error = false;
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function() {
      console.log('tests failed!');
      error = true;
    }).
    on('end', function() {
      if (!error) {
        console.log('all tests succeeded!');
        // process.exit(0);
      }
    });
});

gulp.task('watch', function() {
  gulp.watch(['./*.js'], ['test']);
});
