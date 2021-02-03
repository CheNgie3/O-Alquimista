import net,{Socket, Server as NetServer} from 'net'
import * as stream from "stream";


//1、createServer 创建一个http服务:Server实例
//2、Server继承NetServer，监听connection事件
//connection事件在NetServer.listen()时触发。
////connectionListener： ondata注册收到tcp连接中的数据时回调，处理sokect解析成http req和response，触发request事件执行RequestListener回调
//req:IncomingMessage extends stream.Readable    res:ServerResponse extends stream.Writable
export class http{
    static createServer(listener:RequestListener){
      return new Server(listener)
    }        
}
export class Server extends NetServer {
  constructor(requestlistener?: RequestListener){
      super( { allowHalfOpen: true })
      if(requestlistener){
        this.addListener('request', requestlistener);
      }
      this.addListener('connection', this.connectionListener);
  }
  connectionListener(socket: Socket){
    //...
    socket.on('data',(data)=>{this.socketOnData(socket,data)})
    socket.on('end',this.socketOnEnd)                    
    socket.on('close',this.socketOnClose)  
  }
  private socketOnData(socket:Socket,data:Buffer){
     //...解析http协议
    console.log("socketOnData",data.toString())
    var req= new IncomingMessage(socket,data.toString());
    var res = new ServerResponse(req);
    this.emit('request',req,res);//调用emit方法将request事件发送给每一个监听器的实例并传入req&res,即栗子中回调函数里接收的两个参数
 
  }
  private socketOnEnd(socket:Socket){
    //读取结束符 报错或正常关闭或保持连接
    //socket.end()
  }
  private socketOnClose(socket:Socket){
    //释放解析器
  }                                                      
} 

export type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;
export type Headers = { [key: string]: string };

export class IncomingMessage extends stream.Readable {
  socket:Socket;
  method: string | undefined;
  url: string | undefined;
  version: string | undefined;
  headers: Headers | undefined;
  body: string | undefined;
  message:string;
  constructor(socket:Socket,message:string){
    const streamOptions = {
      highWaterMark: socket.readableHighWaterMark
    };
    super(streamOptions)
    this.socket = socket;
    this.socket.pipe(this);
    this.message=message;
    this.parse();
  }
  // _read(n:number){
  //   console.log(n)
  //   //this.emit("data")
  //   this.socket.read(n)
  //   this.readStart(this.socket)
  // }
  // readStart(socket:Socket){
  //   socket.resume();
  // }
  // readStop(socket:Socket){
  //     socket.pause();
  // }
  private parse(): void {
    const messages = this.message.split('\r\n');
    const [head] = messages;
    const headers = messages.slice(1, -2);
    const [body] = messages.slice(-2,-1);
    this.parseHead(head);
    this.parseHeaders(headers);
    this.parseBody(body);
  }

  private parseHead(headStr: string) {
    const [method, url, version] = headStr.split(' ');
    this.method = method;
    this.url = url;
    this.version = version;
  }

  private parseHeaders(headerStrList: string[]) {
    this.headers = {};
    for (let i = 0; i < headerStrList.length; i++) {
      const header = headerStrList[i];
      let [key, value] = header.split(":");
      if(!value || value.trim()==="") { continue; }
      key = key.toLocaleLowerCase();
      value = value.trim();
      this.headers[key] = value;
    }
  }
  private parseBody(bodyStr: string) {
    if (!bodyStr) return this.body = "";
    this.body = bodyStr;
  }
}
export class ServerResponse extends stream.Writable {
  socket:Socket;
  statusCode:number | undefined
  private resFormatter: ResponseFormatter= new ResponseFormatter();

  constructor(req:IncomingMessage){
    super()
    this.socket=req.socket
  }
  public writeHead(statusCode: number, headers?:Headers):void{
    this.resFormatter.setStatus(statusCode);
    if(headers){
      this.resFormatter.setHeader(headers);
    }
  }
  public write(chunk: any): boolean{
    const resFormatter = this.resFormatter;
    resFormatter.setBody(chunk.toString());
    // 下面三步就是向客户端发送 TCP 字节流数据
    const result= this.socket.write(resFormatter.format());
    return result;
  }

  public end(chunk: any) {
    const resFormatter = this.resFormatter;
    resFormatter.setBody(chunk.toString());
    // 下面三步就是向客户端发送 TCP 字节流数据
    this.socket.write(resFormatter.format());
    this.socket.pipe(this.socket);
    this.socket.end();
  }
}

export class ResponseFormatter {
  private status: number = 200;
  private message: string = 'ok';
  private version: string = 'HTTP/1.1';
  private headers: Headers;
  private body: string = '';

  constructor() {
    this.headers = {
      'Content-Type': 'text/plain'
    };
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public setBody(body: string) {
    this.body = body
  }

  // public setHeader(key: string, val: string) {
  //   this.headers[key] = val;
  // }
  public setHeader(headers:Headers) {
      this.headers=headers;
    }
  public format(): string {
    const head = `${this.version} ${this.status} ${this.message}`;
    let headers = '';
    for (let key in this.headers) {
      const value = this.headers[key];
      headers += `${key.toLocaleLowerCase()}: ${value}\r\n`;
    }
    const combineData = [head, headers, this.body].join('\r\n');
    return combineData;
  }
}