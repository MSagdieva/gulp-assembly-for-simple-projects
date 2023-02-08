import gulp from 'gulp' // Основной модуль
import del from 'del';
import fileinclude from 'gulp-file-include';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import _Readable from 'readable-stream';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import group_media from 'gulp-group-css-media-queries' // Группировка медиа запросов
import autoprefixer from 'gulp-autoprefixer' // Добавление вендорных префиксов
import clean_css from 'gulp-clean-css';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2woff from 'gulp-ttf2woff';
import webphtml from 'gulp-webp';
import prettify from 'gulp-prettify';
import webp from 'gulp-webp';
//import imagemin from 'gulp-imagemin';


const sass = gulpSass(dartSass)

var pipeline= _Readable.pipeline;
const src = gulp.src;
const dest = gulp.dest;

let project_folder="dist";
let source_folder="src";

let path = {
    build:{
        html: project_folder+"/",
        css: project_folder+"/css/",
        js: project_folder+"/js/",
        img: project_folder+"/img/",
        fonts: project_folder+"/fonts/",  
},
    src:{
        html: source_folder+"/*.html",
        scss: source_folder+"/scss/style.scss",
        js: source_folder+"/js/script.js",
        img: source_folder+"/img/**/*.{jpg,png,svg,gif,ico,webp,jpeg}",
        fonts: source_folder+"/fonts/*.ttf",  
},
    watch: {
        html: source_folder+"/**/*.html",
        scss: source_folder+"/scss/**/*.scss",
        js: source_folder+"/js/**/*.js",
        img: source_folder+"/img/**/*.{jpg,png,jpeg,svg}", 
},
    clean:"./"+project_folder+"/"
}

function browsersync(params){
    browserSync.init({
        server:{ baseDir: "./"+project_folder+"/"
        },
        port:3000,
        notify:false
    })
}
function html(){
    return src(path.src.html)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(webphtml())
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function css(){
    return src(path.src.scss)
    .pipe(sass({
        outputStyle:"expanded"
    })
        )
    .pipe(group_media())
    .pipe(autoprefixer({
        overrideBrowserlist:["last 5 versions"],
        cascade: true,
    })
        )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}


gulp.task('compress', function () {
    return pipeline(
          gulp.src(path.build.js),
          uglify(),
          gulp.dest(path.build.js)
    );
  });

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function images(){
    return src(path.src.img)
    .pipe(webp({
        quality:70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    // .pipe(imagemin({
    //     progressive: true,
    //     svgooPlugins: [{removeViewBox: false}],
    //     interlaced: true,
    //     optimizationLevel: 3
    // }))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function fonts(){
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
    src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

function watchFiles(params){ 
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.scss],css)
    gulp.watch([path.watch.js],js)
    gulp.watch([path.watch.img],images)
}
function clean(){
return del(path.clean);
}

// gulp.task('otf2ttf', function(){
//     return src(['src/fonts/*.otf'])
//     .pipe(fonter({
//         formats: ['ttf']
//     }))
//     .pipe(dest('src/fonts'));
// })

const dev = gulp.series(clean, gulp.parallel(js, css, fonts, html));
let build=gulp.series(clean, gulp.parallel(js, css, fonts, html, images));
let watch=gulp.parallel(build, watchFiles, browsersync);
gulp.task('default', watch);
export { dev, build, watch }