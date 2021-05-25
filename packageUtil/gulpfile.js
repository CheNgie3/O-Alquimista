//我们使用gulp-uglify来压缩js文件，减少文件大小


var gulp = require('gulp'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat');
 
 
const min=function(cb){
    // 作为下一个任务的依赖，我们返回这个执行流，这样就可以在本任务执行完后执行下一个任务
    gulp.src(['src/**/*.js','src/*.js']) //多个文件以数组形式传入
        .pipe(uglify()) //使用相应的工具
        .pipe(gulp.dest('dist/gulp')) //执行压缩后保存的文件夹});
    cb()
}
 
const minConcat=function(cb){
    gulp.src(['dist/gulp/**/*.js','dist/gulp/*.js'])
        .pipe(concat('all.js')) //合并之后的文件名
        .pipe(gulp.dest('dist/gulp2')) //合并之后保存的路径
    cb()

}
 

exports.default = gulp.parallel(min,minConcat)