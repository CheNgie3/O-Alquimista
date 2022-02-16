var uglify = require('rollup-plugin-uglify');
export default {
    input: './src/index.js',
    output: {
      file: 'dist/rollup.bundle.js',
      name: 'demo',
      format: 'iife'
    },
    plugins: [
      // uglify(), //压缩代码
    ]
  };