'use strict';

const pathSrc = "./src";
const pathDest = "./public";

const path = {
    root: pathDest,

    html: {
        src: pathSrc + "/html/*.html",
        watch: pathSrc + "/html/**/*.html",
        dest: pathDest
    },
    css: {
        src: pathSrc + "/css/*.css",
        watch: pathSrc + "/css/**/*.css",
        dest: pathDest + "/css"
    },
    scss: {
        src: pathSrc + "/sass/*.{sass,scss}",
        watch: pathSrc + "/sass/**/*.{sass,scss}",
        dest: pathDest + "/css"
    },
    js: {
        src: pathSrc + "/js/*.js",
        watch: pathSrc + "/js/**/*.js",
        dest: pathDest + "/js"
    },
    img: {
        src: pathSrc + "/img/*.{png,jpg,jpeg,gif,svg}",
        watch: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg}",
        dest: pathDest + "/img"
    },
    fonts: {
        src: pathSrc + "/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
        watch: pathSrc + "/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
        dest: pathDest + "/fonts"
    }
}


const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
/*const del = require("del");*/

//Плагины
const fileInclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

//Обработка HTML
const html = () => {
    return src(path.html.src)
        .pipe(fileInclude())
        .pipe(dest(path.html.dest))
        .pipe(browserSync.stream());
}

//Обработка css
const css = () => {
    return src(path.css.src)
        .pipe(css())
        .pipe(autoprefixer())
        .pipe(dest(path.css.dest))
        .pipe(browserSync.stream());
}

//Обработка scss ("./src/sass/*.scss")
const scss = () => {
    return src(path.scss.src)
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest(path.scss.dest))
        .pipe(browserSync.stream());
}

//Обработка JavaScript ("./src/js/*.js")
const js = () => {
    return src(path.js.src)
        .pipe(babel())
        .pipe(dest(path.js.dest))
        .pipe(browserSync.stream());
}
//Обработка Image
const img = () => {
    return src(path.img.src)
        .pipe(newer(path.img.dest))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest(path.img.dest));
}

//Обработка Fonts
const fonts = () => {
    return src(path.fonts.src)
        .pipe(newer(path.fonts.dest))
        .pipe(fonter({
            formats: ["ttf", "woff", "eot", "svg"]
        }))
        .pipe(dest(path.fonts.dest))
        .pipe(ttf2woff2())
        .pipe(dest(path.fonts.dest));
}


//Удаление дериктории
const clear = () => {
    return del("./public");
}

//Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
}
// Сборка
const build = series(
    parallel(html, scss, js, img, fonts)
);



//Наблюдатель
const watcher = () => {
    watch(path.html.src, html).on("all", browserSync.reload);
    watch(path.scss.src, scss).on("all", browserSync.reload);
    watch(path.js.src, js).on("all", browserSync.reload);
    watch(path.img.src, img).on("all", browserSync.reload);
    watch(path.fonts.src, fonts).on("all", browserSync.reload);
}

const dev = series(
    build,
    parallel(watcher, server)
);

//Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.dev = dev;
exports.build = build;