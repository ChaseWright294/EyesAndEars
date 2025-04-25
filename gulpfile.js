const { src, dest, series } = require('gulp');
const eslint = require('gulp-eslint');

// Lint JavaScript files
function lint() {
  return src('src/**/*.js') // Adjust the path to your JS files
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Default task
exports.default = series(lint);