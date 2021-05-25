"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
const zlib_1 = __importDefault(require("zlib"));
function compression(req, res) {
    let acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding) {
        if (/\bgzip\b/.test(acceptEncoding.toString())) {
            res.setHeader('Content-Encoding', 'gzip');
            return zlib_1.default.createGzip();
        }
        else if (/\bdeflate\b/.test(acceptEncoding.toString())) {
            res.setHeader('Content-Encoding', 'deflate');
            return zlib_1.default.createDeflate();
        }
        else {
            return null;
        }
    }
}
//Range支持，断点续传
function rangeTransfer(req, res, filePath, statObj) {
    let start = 0;
    let end = statObj.size;
    let range = req.headers['range'];
    if (range) {
        res.setHeader('Accept-range', 'bytes');
        res.statusCode = 206; // 返回整个内容的一块
        let result = range.match(/bytes=(\d*)-(\d*)/);
        if (result) {
            start = typeof result[1] === "number" ? start : parseInt(result[1]);
            end = typeof result[2] === "number" ? end : parseInt(result[2]);
        }
    }
    return fs_1.default.createReadStream(filePath, {
        start,
        end
    });
}
function sendFile(req, res, filePath, statObj) {
    // 如果缓存存在的话走缓存
    if (isCache(req, res, statObj)) {
        return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', mime_1.default.getType(filePath) + ';charset=utf-8');
    // fs.createReadStream(filePath).pipe(res);
    //支持压缩
    let encoding = compression(req, res);
    if (encoding) {
        // 在这里使用断点续传
        rangeTransfer(req, res, filePath, statObj).pipe(encoding).pipe(res);
    }
    else {
        rangeTransfer(req, res, filePath, statObj).pipe(res);
    }
}
function sendError(req, res, error) {
    res.statusCode = 500;
    // res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(error);
}
function isCache(req, res, statObj) {
    let ifNoneMatch = req.headers['if-none-match'];
    let ifModifiedSince = req.headers['if-modified-since'];
    res.setHeader('Cache-Control', 'private,max-age=10');
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString());
    let etag = statObj.size;
    let lastModified = statObj.ctime.toUTCString();
    res.setHeader('Etag', etag);
    res.setHeader('Last-Modified', lastModified);
    if (ifNoneMatch && ifNoneMatch != etag.toString()) {
        return false;
    }
    if (ifModifiedSince && ifModifiedSince != lastModified) {
        return false;
    }
    if (ifNoneMatch || ifModifiedSince) {
        res.writeHead(304);
        res.end();
        return true;
    }
    else {
        return false;
    }
}
function request(req, res) {
    //请求资源文件，发送给浏览器
    let pathname = req.url || "/";
    if (pathname === '/favicon.ico') {
        sendError(req, res, 'not favicon.ico');
        return;
    }
    else if (pathname == '/') {
        pathname = "/index.html";
    }
    const filePath = path_1.default.join(__dirname, "../public", pathname);
    const statObj = fs_1.default.statSync(filePath);
    if (statObj.isDirectory()) {
        //展示文件列表
    }
    else {
        sendFile(req, res, filePath, statObj);
    }
}
function start() {
    let server = http_1.default.createServer();
    server.on('request', request);
    server.listen(8089, () => {
        console.log("服务启动");
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBNEQ7QUFDNUQsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsZ0RBQXdCO0FBRXhCLFNBQVMsV0FBVyxDQUFDLEdBQW9CLEVBQUUsR0FBbUI7SUFDNUQsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BELElBQUcsY0FBYyxFQUFFO1FBQ2YsSUFBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDO1lBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsT0FBTyxjQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7YUFBTSxJQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUM7WUFDcEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxPQUFPLGNBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMvQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUE7U0FDZDtLQUNKO0FBQ0gsQ0FBQztBQUNELGNBQWM7QUFDZCxTQUFTLGFBQWEsQ0FBRSxHQUFvQixFQUFFLEdBQW1CLEVBQUUsUUFBZSxFQUFDLE9BQWdCO0lBQ2pHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDdkIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxJQUFHLEtBQUssRUFBQztRQUNMLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFDLE9BQU8sQ0FB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