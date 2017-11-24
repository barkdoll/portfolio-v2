const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const server = require('gulp-webserver');

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

gulp.task('copyFonts', () => {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'))
});

// Optimize Images
gulp.task('imageMin', () => {
  gulp.src('src/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('build/img'));
});

// Concatenate and minify the Javascripts!
gulp.task('javascript', () => {
  gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(concat('script.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', () => {
  gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'));
});

// Compile SASS and minify production CSS
gulp.task('sass', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(
      rename('style.css')
    )
    .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['init', 'javascript', 'css', 'sass', 'copyHTML', 'copyFonts']);

// Watches for changes to avoid repetetive running of gulp command
gulp.task('watch', () => {
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/js/*.js', ['javascript']);
  gulp.watch('src/css/*.css', ['css'])
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.htm', ['copyHTML']);
});

gulp.task('server', () => {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
