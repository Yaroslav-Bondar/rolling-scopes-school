const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css', // relative to output.path
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        include: path.resolve('src', 'sass', 'index.scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // Specifies a custom public path for the external resources like images, files, etc inside CSS. Works like 
              // publicPath: path.resolve(__dirname, 'dist', 'css'),
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
})