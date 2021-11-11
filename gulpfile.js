const gulp = require('gulp');
const {src, series, parallel, dest, watch}= require('gulp');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const imagewebp = require('gulp-webp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');


function minhtml() {
    return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(dest('dist'));
}
function cssTask() {
    return src('src/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat('style.css'))
      .pipe(postcss([autoprefixer(), cssnano()])) 
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/css'));
  }
  function webpImage() {
    return src('src/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
  }
  function watchTask() {
    watch(['src/*.css'], { interval: 1000 }, parallel(cssTask));
  }
  exports.cssTask = cssTask;

exports.default = series(
parallel(minhtml, cssTask, 
  webpImage),
  watchTask
);
  