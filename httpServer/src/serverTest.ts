import {http,Server} from "./newhttp"

  export class HttpServer{
    private server:Server;
    constructor(){
      this.server=http.createServer((req,res) => {
          let url=req.url;
          // req.on('data',function(data){
          //   console.log("req",data)
          // })
          console.log("server",url)
          res.write("hello");
          res.end("hi");
        })        
        this.server.listen(3000,function(){
          console.log("3000服务启动")
       })
    }
  }

  new HttpServer();