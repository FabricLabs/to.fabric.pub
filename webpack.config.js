'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        include: [
          path.resolve('./src'),
          path.resolve('./clients'),
          path.resolve('./components'),
        ]
      }
    ]
  },
  output: {
    filename: 'assets/to.fabric.pub.js',
    auxiliaryComment: {
      root: '# Hello, world!'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devtool: 'source-map'
};
