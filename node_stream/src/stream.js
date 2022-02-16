const EventEmitter = require('events');
const fs = require('fs');
class ReadStream extends EventEmitter {
  //暂停模式
  constructor(path, options) {
    super();
    this.path = path;
    this.fd = options.fd || null;
    this.flags = options.flags || 'r'; //文件读权限
    this.mode = options.mode || 0o666; //可读可写
    this.encoding = options.encoding || 'utf8';
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.autoDestroy = options.autoDestroy || true; //此流是否应在结束后自动调用自身的 .destroy()

    this.readableFlowing = null;
    this.needReadable = false;
    this.start = options.start || 0; //设置读取开始位置
    this.end = options.end || Infinity; //设置读取结束位置
    //对start、end进行校验，略
    this.pos = this.start;
    this.buffer = Buffer.alloc(this.highWaterMark);
    this.buffersPool = [];
    this.bytesRead = 0;
    this.poolused = 0;

    if (typeof this.fd !== 'number') this.open(); //如果fd不存在，说明文件没有打开
    super.on.call(this, 'end', function () {
      if (this.autoClose) {
        this.destroy();
      }
    });
  }
  on(ev, fn) {
    const res = super.on.call(this, ev, fn);
    if (ev === 'data') {
      if (this.readableFlowing != false) {
        this.resume();
      }
    } else if (ev === 'readable') {
      this.read(0);
    }
    return res;
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoDestroy) {
          this.destroy();
        }
        this.emit('error', err);
        return;
      }
      this.fd = fd;
      this.emit('open', fd);
      this.read();
    });
  }
  // read(n) {
  //   if (typeof this.fd != 'number') {
  //     return this.once('open', () => this.read());
  //   }
  //   n = parseInt(n, 10);
  //   if (n != n) {
  //     n = this.poolused;
  //   }
  //   if (this.poolused == 0) this.needReadable = true;
  //   let ret;
  //   if (0 < n < this.poolused) {
  //     ret = Buffer.alloc(n);
  //     let b;
  //     let index = 0;
  //     while (null != (b = this.buffersPool.shift())) {
  //       for (let i = 0; i < b.length; i++) {
  //         ret[index++] = b[i];
  //         if (index == ret.length) {
  //           this.poolused -= n;
  //           b = b.slice(i + 1);
  //           this.buffersPool.unshift(b);
  //           break;
  //         }
  //       }
  //     }
  //     if (this.encoding) ret = ret.toString(this.encoding);
  //   }
  //   if (this.poolused == 0 || this.poolused < this.highWaterMark) {
  //     _read(0);
  //   }
  //   return ret;
  // }
  read() {
    if (typeof this.fd != 'number') {
      return this.once('open', () => this.read());
    }
    let m = this.end
      ? Math.min(this.end - this.pos + 1, this.highWaterMark)
      : this.highWaterMark;
    fs.read(this.fd, this.buffer, 0, m, this.pos, (err, bytes) => {
      console.log('fs.read');
      if (err) {
        if (this.autoDestroy) {
          this.destroy();
        }
        this.emit('error', err);
        return;
      }
      if (bytes) {
        let data = this.buffer.slice(0, bytes);
        this.pos += bytes;
        data = this.encoding ? data.toString(this.encoding) : data;
        this.emit('data', data);
        if (this.end && this.pos > this.end) {
          this.emit('end');
          this.destroy();
        } else {
          if (this.readableFlowing) this.read();
        }
      } else {
        this.emit('end');
        this.destroy();
      }
    });
  }
  // _read(size) {
  //   let m = this.end
  //     ? Math.min(this.end - this.pos + 1, this.highWaterMark)
  //     : this.highWaterMark;
  //   fs.read(this.fd, this.buffer, 0, m, this.pos, (err, bytesRead) => {
  //     if (err) {
  //       if (this.autoDestroy) {
  //         this.destroy();
  //       }
  //       this.emit('error', err);
  //       return;
  //     }
  //     let data;
  //     if (bytesRead > 0) {
  //       this.pos += bytesRead;
  //       this.bytesRead += bytesRead;
  //       this.poolused += bytesRead;
  //       if (this.end && this.pos > this.end) {
  //         if (this.needReadable) {
  //           this.emit('readable');
  //         }
  //         this.emit('end');
  //       } else {
  //         this.push(data);
  //         if (this.needReadable) {
  //           this.emit('readable');
  //           this.needReadable = false;
  //         }
  //       }
  //     } else {
  //       if (this.needReadable) {
  //         this.emit('readable');
  //       }
  //       return this.emit('end');
  //     }
  //     this.push(data);
  //   });
  // }
  push(data) {
    this.buffersPool.push(data);
    if (this.needReadable) {
      this.emit('readable');
    }
  }
  pause() {
    this.readableFlowing = false;
  }
  resume() {
    this.readableFlowing = true;
    this.read();
  }
  pipe(dest) {
    this.readableFlowing = true;
    this.on('data', (data) => {
      let flag = dest.write(data);
      if (!flag) {
        this.pause();
      }
    });
    dest.on('drain', () => {
      this.resume();
    });
  }
  destroy() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
}

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.fd = options.fd;
    this.encoding = options.encoding || 'utf8';
    this.flags = options.flags || 'w';
    this.mode = options.mode || 0o666;
    this.start = options.start || 0;
    this.pos = this.start; //开始写入的索引位置
    this.writing = false; //没有在写入过程中
    this.buffersPool = [];
    this.poolused = 0;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.autoDestroy = options.autoDestroy || true;
    this.open();

    //如果监听到end事件，而且要求自动关闭的话则关闭文件
    this.on('end', function () {
      if (this.autoClose) {
        this.destroy();
      }
    });
  }
  open() {
    //open方法
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoDestroy) {
          this.destroy();
        }
        this.emit('error', err);
        return;
      }
      this.fd = fd;
      this.emit('open', fd);
    });
  }
  destroy() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
  write(chunk, encoding, cb) {
    console.log('write', chunk);
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this.write(chunk, encoding, cb);
      });
    }
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding);
    this.poolused += chunk.length;
    this.needDrain = this.highWaterMark <= this.poolused;
    if (this.writting) {
      this.buffersPool.push({
        chunk,
        encoding,
        cb,
      });
    } else {
      this.writting = true;
      this._write(chunk, encoding, () => this.clearBuffer());
    }
    return !this.needDrain;
  }
  _write(chunk, encoding, cb) {
    console.log('_write', chunk);
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
      if (err) {
        if (this.autoDestroy) {
          this.destroy();
        }
        this.emit('error', err);
        return;
      }
      this.pos += bytesWritten;
      this.poolused -= bytesWritten;
      cb && cb();
    });
  }
  clearBuffer() {
    let data = this.buffersPool.shift();
    if (data) {
      this._write(data.chunk, data.encoding, () => this.clearBuffer());
    } else {
      this.writting = false;
      this.emit('drain');
      this.needDrain = false;
    }
  }
}

module.exports = { ReadStream, WriteStream };
