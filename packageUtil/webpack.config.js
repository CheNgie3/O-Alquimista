const AnalyzePlugin=require('./AnalyzePlugin')
const RemoveLogsPlugin=require('./RemoveLogsPlugin')


module.exports = {
    entry: './src/index.js',
    output: {
      filename: './webpack.bundle.js',
      library: 'demo',
      libraryTarget: 'umd'
    },
    plugins:[
    //  new AnalyzePlugin({filename:"./index.html"}),
    //  new RemoveLogsPlugin(),
    ]
  };