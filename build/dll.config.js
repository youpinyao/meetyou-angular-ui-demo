const path = require('path');
const webpack = require('webpack');
const config = require('./config/config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./config/module.config.js');
const pluginHappy = require('./config/happy.config.js');

let plugins = [
  // 输出 css
  new ExtractTextPlugin('[name].dll.css'),
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    context: path.resolve(__dirname),
    path: path.join(__dirname, '../.dll', '[name]-manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]_library'
  })
];

plugins = plugins.concat(pluginHappy);

module.exports = function () {
  return {
    entry: {
      vendor: [path.resolve(__dirname, '../', config.vendor)]
    },
    output: {
      path: path.join(__dirname, '../.dll'),
      filename: '[name].dll.js',
      /**
       * output.library
       * 将会定义为 window.${output.library}
       * 在这次的例子中，将会定义为`window.vendor_library`
       */
      library: '[name]_library'
    },
    module: modules(),
    plugins,
  };
};
