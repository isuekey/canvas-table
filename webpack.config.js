
const path = require('path');

module.exports = {
  mode:'production',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'canvastable.js',
    library:'canvastable.js',
    libraryTarget:'umd'
  },
  externals:{},
  resolve:{
    extensions:[".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module:{
    // rules:[
      // {test:/\.tsx?$/, loader:"ts-loader" },
    // ],
  },
};
