// function defaultTask(cb) {
//     // place code for your default task here
//     console.log("顾平杰")
//     cb();
// }

// exports.default = defaultTask;


// 公开任务，私有任务
// const { series, parallel } = require("gulp");

// function js(cb) {
//     console.log("js被执行了");
//     cb();
// }
// function css(cb) {
//     console.log("css被执行了");
//     cb();
// }
// function html(cb) {
//     console.log("html被执行了");
//     cb();
// }

// exports.default = series(js, css);//series：任务依次执行
// exports.default = parallel(js, css);//parallel：任务同时执行
// exports.default = series(html, parallel(js, css));//series和parallel嵌套使用



// 处理文件
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");//压缩代码
const rename = require("gulp-rename");//输出文件重命名

// I/O操作：I（input），O（output）
// less -> css -> css加上css3前缀 -> 压缩 -> 输出

// node转换流

exports.default = function () {
    return src('src/js/*.js')//入口
    .pipe(dest('dis/js'))//出口
    .pipe(uglify())
    .pipe(rename({extname:".min.js"}))
    .pipe(dest('dis/js'))//出口
}




// 文件监控
const { watch } = require("gulp");

watch("src/css/*", {
    // 此处为配置参数
    delay: 2000
}, function (cb) {
    console.log("文件被修改了")
    cb();
})