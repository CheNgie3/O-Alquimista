import http, { IncomingMessage, ServerResponse } from "http"
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import zlib from 'zlib';

function compression(req: IncomingMessage, res: ServerResponse) {
  let acceptEncoding = req.headers['accept-encoding'];
  if(acceptEncoding) {
      if(/\bgzip\b/.test(acceptEncoding.toString())){
          res.setHeader('Content-Encoding','gzip');
          return zlib.createGzip();
      } else if(/\bdeflate\b/.test(acceptEncoding.toString())){
          res.setHeader('Content-Encoding','deflate');
          return zlib.createDeflate();
      } else {
          return null
      }
  }
}
//Range支持，断点续传
function rangeTransfer (req: IncomingMessage, res: ServerResponse, filePath:string,statObj:fs.Stats) {
  let start = 0;
  let end = statObj.size;
  let range = req.headers['range'];
  if(range){
      res.setHeader('Accept-range','bytes');
      res.statusCode=206// 返回整个内容的一块
      let result = range.match(/bytes=(\d*)-(\d*)/);
      if(result){
        start = typeof result[1]==="number" ? start : parseInt(result[1]);
        end = typeof result[2]==="number" ? end : parseInt(result[2])
      }
  }
  return fs.createReadStream(filePath, {
      start,
      end
  })
}
function sendFile(req: IncomingMessage, res: ServerResponse, filePath:string,statObj:fs.Stats) {
    // 如果缓存存在的话走缓存
    if(isCache(req, res, statObj)){
        return;
    }
    res.statusCode = 200; 
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
    // fs.createReadStream(filePath).pipe(res);
    //支持压缩
    let encoding = compression(req,res);
    if(encoding) {
      // 在这里使用断点续传
      rangeTransfer(req, res, filePath, statObj).pipe(encoding).pipe(res)
    }else {
      rangeTransfer(req, res, filePath, statObj).pipe(res)
  }

}
function sendError(req: IncomingMessage, res: ServerResponse,error:string){
    res.statusCode = 500; 
    // res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(error)
}
function isCache(req: IncomingMessage, res: ServerResponse, statObj:fs.Stats){
    let ifNoneMatch = req.headers['if-none-match'];
    let ifModifiedSince = req.headers['if-modified-since'];
    res.setHeader('Cache-Control','private,max-age=10');
    res.setHeader('Expires',new Date(Date.now() + 10*1000).toUTCString());
    let etag = statObj.size;
    let lastModified = statObj.ctime.toUTCString();
    res.setHeader('Etag',etag)
    res.setHeader('Last-Modified',lastModified);
    if(ifNoneMatch && ifNoneMatch != etag.toString()) {
        return false
    }
    if(ifModifiedSince && ifModifiedSince != lastModified){
        return false
    }
    if(ifNoneMatch || ifModifiedSince) {
        res.writeHead(304);
        res.end();
        return true
    } else {
        return false
    }
}
function request(req: IncomingMessage, res: ServerResponse){
//请求资源文件，发送给浏览器
  let pathname = req.url || "/";
  if (pathname === '/favicon.ico') {
    sendError(req,res,'not favicon.ico')
    return
  } 
  else if (pathname == '/') {
    pathname="/index.html"
  }
  const filePath = path.join(__dirname,"../public",pathname);
  const statObj=fs.statSync(filePath) 
  if(statObj.isDirectory()){
    //展示文件列表
  }else{
      sendFile(req,res,filePath,statObj)
  }
}
function start(){
  let server=http.createServer();
  server.on('request',request)
  server.listen(8089,()=>{  
      console.log("服务启动")
  })
}

start();