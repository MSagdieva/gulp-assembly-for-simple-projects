const fileinclude = require('gulp-file-include');

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
        html: source_folder+"/html/*.html",
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
let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    scss = require('gulp-sass'),
    rename  = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin')
    webp = require('gulp-webp')
    webphtml = require('gulp-webp-html')
    ttf2woff = require('gulp-ttf2woff')
    ttf2woff2 = require('gulp-ttf2woff2')
    fonter = require('gulp-fonter')
    prettify = require('gulp-html-prettify');

function browserSync(params){
    browsersync.init({
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
    .pipe(browsersync.stream())
}

function css(){
    return src(path.src.scss)
    .pipe(scss({
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
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
    .pipe(webp({
        quality:70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
        progressive: true,
        svgooPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
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
function clean(params){
return del(path.clean);
}

gulp.task('otf2ttf', function(){
    return src(['src/fonts/*.otf'])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest('src/fonts'));
})

let build=gulp.series(clean, gulp.parallel(js, css, fonts, html, images));
let watch=gulp.parallel(build, watchFiles, browserSync);
        exports.css = css;        
        exports.html = html;
        exports.js = js;
        exports.images = images;
        exports.fonts = fonts;       
        exports.build = build;   
        exports.watch = watch;
        exports.default = watch;