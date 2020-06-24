const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   entry:{
      index: ['./source/js/index.js']
   },
   plugins: [
      new CleanWebpackPlugin(['./build'])
   ],
   output: {
      path: __dirname + '/public/build',
      filename: '[name].js'
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader'
         },
      }]
   }
};