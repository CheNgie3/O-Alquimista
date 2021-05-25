module.exports = class AnalyzePlugin {
    constructor(config){
        // 获取打包文件名
        this.filename = config.filename;
    }
    apply(compiler){
        compiler.hooks.emit.tap("analyze-plugin",(compilation)=>{ //确定输出事件，在这里获取和修改输出的内容
            const assets = compilation.assets;
            const entries = Object.entries(assets);
            let content = `| 文件名  |  文件大小 |
| ------------ | ------------ |
`
            entries.forEach(([filename,fileObj])=>{
                content+=`|${filename}|${fileObj.size()}|
`
            });
            content += `

> 文件总数 ${entries.length} 个`
            compilation.assets[this.filename] = {
                source(){
                    return content
                },
                size(){
                    return content.length
                }
            }
        })
    }
}