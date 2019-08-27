 var gulp = require('gulp');
// 压缩html
var htmlClean = require("gulp-htmlclean");
//压缩图片
var imageMin = require("gulp-imagemin");
//压缩js
var uglify = require("gulp-uglify");
//去掉js中的调试语句
var debug = require("gulp-strip-debug");
//将less转化为css
var less = require("gulp-less");
//压缩css
var cleanCss = require("gulp-clean-css");
//gulp-postcss autoprofixer自动添加前缀 
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
//启用服务器
var connect = require("gulp-connect");

var folder = {
     src:"src/",
     dist:"dist/",
 };
 //自定义变量

 //判断当前环境变量
 //如果是开发环境不压缩,生成环境进行压缩
var devMod = process.env.NODE_ENV == "development";
//  export NODE_ENV=development 设置环境变量
console.log(devMod)
 gulp.task("image",function(){
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/")) 
           
 })

 gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")//读取文件
        .pipe(connect.reload());
        //自动刷新
        if(!devMod){
            page.pipe(htmlClean())
            //压缩hTml
        }
        page.pipe(gulp.dest(folder.dist + "html/")) 
        //gulp.pipe生成文件流，把文件放入函数进行一系列的处理
        //输出文件（gulp.dest文件位置）   
 })

 gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer]));
        if (!devMod){
            page.pipe(cleanCss())
        }      
        page.pipe(gulp.dest(folder.dist + "css/")) 

 })

 gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        }      
        page.pipe(gulp.dest(folder.dist + "js/")) 
       
 })

 gulp.task("server",function () {
    connect.server({
        port:"9090",
        livereload:true,
        //自动刷新
    })
 })

 //开启监听监听文件变换
 gulp.task("watch",function () {
     gulp.watch(folder.src + "html/*",["html"]);
     gulp.watch(folder.src + "css/*",["css"]);
     gulp.watch(folder.src + "js/*",["js"]);
 })
 gulp.task("default",["html","css","js","image","server","watch"])
 //入口


//  gulp (runner Task 任务运行器  流操作)
// webpack (module bundle 模块打包器 把一切都看成模块)