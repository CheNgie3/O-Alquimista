import http from "http"
import fs from 'fs';
import path from 'path';
import { exec,spawn} from 'child_process'
  export class HttpServer{
    private server:http.Server;
    private urlCommand={
      "/":this.getHtml,
      "/ucfCreate":this.fsCreate,
      "/favicon.ico":function(){return null},
      "/test":this.Test
    }
    constructor(){
      this.server=http.createServer((req,res) => {
        console.log(111,req.socket)
          let url=req.url;
          if(url){
            const func=this.urlCommand[url];
            if(func){
              func.bind(this)(res)
            }else{
              res.writeHead(404,{'Content-Type':'application/json'});
              res.end()
              return;
            }
          }
        })
        
        this.server.listen(3000,function(){
          console.log("3000服务启动")
       })
    }
    private getHtml (res:http.ServerResponse){
        const html=fs.readFileSync(path.join(__dirname,"../static/test.html"))
        res.writeHead(200,{ 'Content-Type':'text/html'});
        res.end(html.toString());
        res.end();
    }  
    private fsCreate(res:http.ServerResponse){
        exec('ucf create', {cwd: "E:\\learn\\node"},function(error, stdout){
            if(error) {
                console.error('error: ' + error);
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(`执行结果${error}`);
                return;
            }
            res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
            res.write(stdout)
            res.end(`执行结果Success`);
        });
    }
    private Test(res:http.ServerResponse){
      var ls = spawn('ucf', ['create'],{cwd:path.join(__dirname,"../static"),shell: 'cmd.exe'}); //stdio默认是pipe
      let i=0;

      res.writeHead(200,{'Content-Type':'"application/json; charset=utf-8"'});
      //ls.stdout.pipe(res,{end:false})  //在子进程的stdout 与当前进程的stdout之间建立管道实现

      ls.stdout.on('data', (data) => { //监听子进程的stdio流，可以以父进程的流输入输出
          console.log('data from child: '+i+" " + data); //console.log其实底层依赖的就是process.stdout，相当于process.stdout.write(data);
          res.write(data)
          i++;
      });

      ls.stderr.on('error', (err)=>{
          console.log('Error ' + err);
          res.write(err)
      });
      ls.on('close', (code)=>{
         console.log('child exists with code: ' + code);
         res.end('child exists with code: ' + code);
      });
    }
  }

  new HttpServer();