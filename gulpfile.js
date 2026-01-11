const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

function css(done){
    // identificar el archivo principal
    src("src/scss/**/*.scss")
    .pipe(plumber())
    // compilar SASS
    .pipe(sass())
    // Exportarlo o guadarlo en una ubicación
    .pipe(dest("build/css"))
    done();
}

function cssBuild(done){
    src("build/css/app.css")
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(purgecss({
        content: ['index.html']
    }))
    .pipe(dest("build/css"))
    done();
}

function imagenes(done){
    src("src/img/**/*")
    .pipe(imagemin(
        [imagemin.mozjpeg({quality: 75, progressive: true}),
         imagemin.optipng({optimizationLevel: 5})]))
    .pipe(dest("build/img"))
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    done();
}
exports.dev = dev;
exports.build = series(cssBuild);
exports.default = series(css, imagenes, dev);
