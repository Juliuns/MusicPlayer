const { src, series, dest, watch } = require("gulp");

const htmlClean = require("gulp-htmlclean");//压缩html的插件
const less = require("gulp-less");//转换less代码
const cleanCss = require("gulp-clean-css");//压缩css代码
const stripDebug = require("gulp-strip-debug");//去除调试阶段代码
const uglify = require("gulp-uglify");//压缩js代码
const imageMin = require("gulp-imagemin");//压缩图片
const connect = require("gulp-connect");//服务器插件


const folder = {
    src: "src/",//入口路径
    dist: "dist/"//出口路径
}

function html() {
    // 压缩html
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html/'))
        .pipe(connect.reload());//热更新
}

function css() {
    return src(folder.src + 'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist + 'css/'))
        .pipe(connect.reload());//热更新
}

function js() {
    return src(folder.src + 'js/*')
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(dest(folder.dist + 'js/'))
        .pipe(connect.reload());//热更新
}

function image() {
    return src(folder.src + 'images/*')
        // .pipe(imageMin())
        .pipe(dest(folder.dist + 'images/'))
}


function server(cb) {//服务器任务
    connect.server({
        port: "1573",//端口号
        livereload: true,//自动刷新
    })
    cb();
}


// 开启任务监听文件变化
watch(folder.src + "html/*", function (cb) {//监听html文件
    html();
    cb();
});

watch(folder.src + "css/*", function (cb) {//监听css文件
    css();
    cb();
});

watch(folder.src + "js/*", function (cb) {//监听js文件
    js();
    cb();
});


exports.default = series(html, css, js, image, server)