const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets'
    }])
  ]
}
