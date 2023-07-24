const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'ts', 'index.ts')
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'html', 'index.html'),
      filename: path.resolve(__dirname, 'dist', 'index.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: [path.resolve(__dirname, 'src', 'ts')],
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        // include: path.resolve('src', 'sass', 'index.scss'),
      //   // exclude: /node_modules/,
      //   // type: 'asset/resource',
      //   // generator: {
      //   //   filename: 'bundle.css',
      //   //   outputPath: '../css/'
      //   // },
      //   use: [
      //     // 'sass-loader',
      //     // 'style-loader',
      //     // 'css-loader'
      //   ]
      }
    ]
  },
}
