const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

/* -- TOP LEVEL FUNCTIONS --

  gulp.task - define tasks
  gulp.src - point to files to use
  gulp.dest - points to folder to output
  gulp.watch - watch files and folders for changes
*/

gulp.task('init', () => {
  return console.log('Gulp is running...');
});

// Copy all HMTL files
gulp.task('copyHTML', () => {
  gulp.src('src/*.htm')
    .pipe(gulp.dest('build'));
});

// Optimize Images
gulp.task('imageMin', () => {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Concatenate and minify the Javascripts!
gulp.task('javascript', () => {
  gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Compile SASS and minify production CSS
gulp.task('css', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css'));
});

// Log finished
gulp.task('end', () => {
  return console.log('Gulp finished.');
});

gulp.task('default', ['init', 'imageMin', 'javascript', 'css', 'copyHTML', 'end']);

// Watches for changes to avoid repetetive running of gulp command
gulp.task('watch', () => {
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/js/*.js', ['javascript']);
  gulp.watch('src/sass/*.scss', ['css']);
  gulp.watch('src/*.htm', ['copyHTML']);
});
