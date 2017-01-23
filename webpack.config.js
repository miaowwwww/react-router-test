var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  // entry:[
  //   path.resolve(__dirname, './src/index.js'),
  //   path.resolve(__dirname, './src/third/flexible.js')
  // ],
  entry: {
    main : './src/index.js'
  },
  output:{
    path:path.resolve(__dirname,'./build'),
    filename:'[name].js'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }, 
      {test: /\.(png|jpg)$/, loader: 'url?limit=40000'},
      {test:/\.less$/,loader:'style!css!less'}
      // { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader",'css?sourceMap') }
    ]
  },
  devServer: {//在开发环境中，使browserHistory刷新不会找不到地址
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: './build/index.html'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9999' }),
    // new ExtractTextPlugin("styles.css "), //没有成功？难道因为我用的是less
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'flexible', /* filename= */'flexible.js')
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]

}
