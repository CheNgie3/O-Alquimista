
const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    const options = loaderUtils.getOptions(this);//获取到用户传入的 options
     // 通过 this.callback 告诉 Webpack 返回的结果
    this.callback(null, source, sourceMaps);
    // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
    return;

     //异步
     // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
     var callback = this.async();
     someAsyncOperation(source, function(err, result, sourceMaps, ast) {
         // 通过 callback 返回异步执行后的结果
         callback(err, result, sourceMaps, ast);
     });
  };


//webpack为loader提供了各种API，比如this.callback
//   this.callback(
//     // 当无法转换原内容时，给 Webpack 返回一个 Error
//     err: Error | null,
//     // 原内容转换后的内容
//     content: string | Buffer,
//     // 用于把转换后的内容得出原内容的 Source Map，方便调试
//     sourceMap?: SourceMap,
//     // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
//     // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
//     abstractSyntaxTree?: AST
// );