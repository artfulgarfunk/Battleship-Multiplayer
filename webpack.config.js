const path = require('path');
const buildDirectory = './static/';


module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(buildDirectory),
    filename: 'app.bundle.js',
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-0']
        }
      },
    ]
  },
};
