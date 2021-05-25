const fsPromises = require("fs").promises;
module.exports = class RemoveLogsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("RemoveLogs", stats => {
      const { path, filename } = stats.compilation.options.output;
        let filePath = path + "/" + filename;
        fsPromises.readFile(filePath,{encoding:"utf8"}).then((data)=>{
           const rgx = /console.log\(.*?\)/;
           const newdata = data.replace(rgx, "");
           return fsPromises.writeFile(filePath, newdata)
        }).then((res)=>{
          console.log("Log remove")
        }).catch((error)=>{
          console.log(error)
        })
      })
  }
};