import fs from 'fs';
import path from 'path';


abstract class FileOperator{
    subPath:string
    targetPath:string
    constructor(filepath:string,targetpath?:string){ 
        debugger                                           
        this.subPath=filepath;
        this.targetPath=targetpath ||"";
    }
    abstract operator():void 
    steamMerge(subFilepath:string,files:Array<string>,writestream:fs.WriteStream){
        if (!files.length) {
          return writestream.end();
        }
        const file=files.shift(),
          subFile = path.join(subFilepath, file!),
          stats=fs.statSync(subFile);
        if (stats.isFile()) {
          let readstream = fs.createReadStream(subFile, { encoding: 'utf-8' });
          readstream.pipe(writestream, { end: false });
          
          readstream.on('end',()=>{
            console.log(`${file}文件写入完成`)
            this.steamMerge(subFilepath,files,writestream)
          })
          readstream.on('error', (error) => { // 监听错误事件，关闭可写流，防止内存泄漏
            console.error(error);
            writestream.close();
          });
          
        }
    }
    writeFile(filepath: string, filename: string, data: string = '') {
        //创建文件
        const dirname = path.join(filepath, filename);
        return fs.promises.writeFile(dirname, data)
          .then(()=>{
            console.log(`创建文件${filename}成功！`);
          })
          .catch((error) => {
            console.log("writeFile:",error);
          })
    }
    mkdirsSync(dirname: string) {
        //同步创建多层文件夹
        try{
          if (fs.existsSync(dirname)) {
            return true;
          }
          if (this.mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
          }
        }catch(e){
          console.log("mkdirsSync:",e)
        }
    }
    copyDir(subDir: string, taDir: string) {
        //复制文件夹及所有文件
        try{
            if (fs.existsSync(taDir)) {
              const files = fs.readdirSync(subDir);
              files.forEach( (file) => {
                var srcPath = path.join(subDir, file);
                var tarPath = path.join(taDir, file);
                const stats=fs.statSync(srcPath);
                if (stats.isDirectory()) {
                  fs.mkdirSync(tarPath);
                  console.log(`create ${tarPath}`)
                  this.copyDir(srcPath, tarPath);
                }else {
                  fs.copyFileSync(srcPath, tarPath)
                  console.log(`create ${tarPath}`)
                }
              });
            } else {
              this.mkdirsSync(taDir);
              this.copyDir(subDir, taDir);
            }
        }catch(e){
          console.log("copyDir:",e);
        }
    }
}
class CreateFile extends FileOperator{
    constructor(filepath:string){
        super(filepath);
    }
    operator():void{
      super.mkdirsSync(this.subPath);
      debugger

      console.log(`创建文件夹${this.subPath}成功！`);
      super.writeFile(this.subPath, 'a.js', '123');
      super.writeFile(this.subPath, 'b.js', '456');
    }
}
class AddFile extends FileOperator{
    constructor(filepath:string,targetpath:string){
        super(filepath,targetpath);
    }
    operator():void{
        super.copyDir(this.subPath, this.targetPath);
    }
}
class ComposeFile extends FileOperator{
    constructor(filepath:string,targetpath:string){
        super(filepath,targetpath);
    }
    operator():void{
        try{
            super.mkdirsSync(this.targetPath);
            const dirname = path.join(this.targetPath, 'c.js');
            let writeStream = fs.createWriteStream(dirname, { encoding: 'utf-8' });
            const files =  fs.readdirSync(this.subPath);
            if(files){
               super.steamMerge(this.subPath,files,writeStream)
            }
        }catch(e){
            console.log("compose:",e)
        }
    }
}
export class FileCli{
    readonly filePath1:string=path.join(process.cwd(), './demo/test');
    readonly filePath2:string=path.join(process.cwd(), './demo/test1');
    readonly filePath3:string=path.join(process.cwd(), './demo/test2');
    commands: any={
            create:this.create,
            add:this.add,
            compose:this.compose
        }
   
    cli(){
        const argv=process.argv[2];
        const func=this.commands[argv];
        func.call(this);
    }
    create() {
      return new CreateFile(this.filePath1).operator();
    }
    add() {
      return new AddFile(this.filePath1,this.filePath2).operator();
     }
    compose() {
       return new ComposeFile(this.filePath1,this.filePath3).operator();
    }
}
