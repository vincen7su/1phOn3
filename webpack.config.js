module.exports = {
  entry: './src/core.js',
  output: {
    path: __dirname + '/dist',
    filename: 'core.js',
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      './src',
      './src/components'
    ],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
};