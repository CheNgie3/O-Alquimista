const { RandomNumberStream, OutputStream } = require('./custom_stream');
const { ReadStream, WriteStream } = require('./stream');
const psth = require('path');
const path = require('path');
//验证自定义Stream
const rns = new RandomNumberStream({ max: 10 });
rns.pipe(process.stdout);
rns.on('data', (chunk) => {
  console.log('data', chunk);
});
rns.on('readable', () => {
  let chunk;
  while ((chunk = rns.read()) !== null) {
    console.log('readable', chunk);
  }
});

// const os = new OutputStream({
//   highWaterMark: 1,
// });
// let i = 0;
// function write() {
//   let flag = true;
//   while (i <= 6 && flag) {
//     i++;
//     flag = os.write(i + '', 'utf8');
//     console.log('flag', flag);
//   }
// }
// os.on('drain', () => {
//   console.log('drain');
//   write();
// });

// write();

// 验证自己写的ReadStream;
// let rs = new ReadStream(path.join(__dirname, '../test/1.txt'), {
//   encoding: 'utf8',
//   start: 0,
//   end: 1000,
//   highWaterMark: 50,
// });

// rs.on('open', () => console.log('open'));

// rs.on('data', (data) => {
//   console.log(data, new Date());
//   rs.pause();
// });

// rs.on('readable', () => {
//   let r = rs.read(3);
//   console.log(r);
// });

// rs.on('end', () => console.log('end'));
// rs.on('close', () => console.log('close'));
// rs.on('error', (err) => console.log('err', err));

// setInterval(() => {
//   console.log('resume');
//   rs.resume();
// }, 200);

//验证自己写的WriteStream
// let ws = new WriteStream(path.join(__dirname, '../test/2.txt'), {
//   highWaterMark: 5,
// });

// let i = 0;

// function write() {
//   let flag = true;
//   while (i <= 6 && flag) {
//     i++;
//     flag = ws.write(i + '', 'utf8');
//     console.log('flag', flag);
//   }
// }
// ws.on('open', () => console.log('open'));
// ws.on('end', () => console.log('end'));
// ws.on('close', () => console.log('close'));
// ws.on('error', (err) => console.log('err', err));

// ws.on('drain', function () {
//   console.log('drain');
//   write();
// });

// write();

//验证使用 pipe 实现文件内容复制
// let rs = new ReadStream(path.join(__dirname, '../test/1.txt'), {
//   highWaterMark: 3,
// });
// let ws = new WriteStream(path.join(__dirname, '../test/2.txt'), {
//   highWaterMark: 2,
// });

// rs.pipe(ws);
