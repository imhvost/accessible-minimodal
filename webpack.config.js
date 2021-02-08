const NODE_ENV = process.env.NODE_ENV
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix = new LessPluginAutoPrefix({
  browsers: ['last 5 versions', 'IE >= 10']
})
const LessPluginCleanCSS = require('less-plugin-clean-css')
const cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true })
const PACKAGE = require('./package.json')
const banner = PACKAGE.name + ' v' + PACKAGE.version + '\n' + PACKAGE.repository.url.replace('git+', '') + '\n'

module.exports = {
  mode: NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    test: './src/index.js',
    'accessible-minimodal.min': './src/accessible-minimodal.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    hot: false,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                plugins: [
                  autoprefix,
                  cleanCSSPlugin
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new webpack.BannerPlugin(banner)
  ]
}
