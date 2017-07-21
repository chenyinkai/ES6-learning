var path = require('path');
module.exports = {
  entry: "./es6js/main.js", //webpack入口文件   单一入口
  output: {
    path: __dirname,   //__dirname代表根目录
    filename: "bundle.js"    //编译后的文件   在index.html引入这个文件即可
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}