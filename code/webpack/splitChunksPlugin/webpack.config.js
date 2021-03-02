// run ./node_modules/.bin/webpack

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  entry: {
    a: './a.js',
    b: './b.js',
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}