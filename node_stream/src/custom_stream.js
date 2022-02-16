const stream = require('stream');
const { ReadStream, WriteStream } = require('./stream');

class RandomNumberStream extends stream.Readable {
  constructor(options) {
    super(options);
    this.max = options.max;
  }

  _read() {
    console.log('_read');
    let ctx = this;
    if (ctx.max) {
      const randomNumber = parseInt(Math.random() * 10000);
      ctx.push(`${randomNumber}\n`);
      ctx.max -= 1;
    } else {
      ctx.push(null);
    }
  }
}

class OutputStream extends stream.Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    process.stdout.write(chunk.toString().toUpperCase());
    callback && callback();
  }
}
module.exports = {
  RandomNumberStream,
  OutputStream,
};
