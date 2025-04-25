const {watch, series} = require('gulp');

function watchFiles() {
    watch('./src/**/*.js', series(lint, test, build));
    watch('./src/**/*.css', series(lint, test, build));
}

function lint(cb) {
    // Linting task here
    console.log('Linting files...');
    cb();
}

function test(cb) {
    
    console.log('Running tests...');
    cb();
}

function build(cb) {
    // Build task here
    console.log('Building project...');
    cb();
}

function defaultTask(cb) {
    watchFiles();
    console.log('Watching for changes...');
    cb();
  }
  
  exports.default = defaultTask;
  exports.lint = lint;
  exports.test = test;
  exports.build = build;