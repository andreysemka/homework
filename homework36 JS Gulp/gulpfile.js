const gulp = require('galp');
const scss = require('gulp-scss');

/*function scss() {
    return gulp
        .src('./style.scss')
        .pipe(sass().once('erorr', sass.logErorr))
        .pipe(gulp.dest('./'))
}
exports.scss = scss;*/
(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    gulp.task("scss", function () {
        gulp.src(
            "./style.scss"
        ).pipe(scss(
            { "bundleExec": true }
        )).pipe(gulp.dest("./"));
    });
}(require));