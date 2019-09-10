require('dotenv').config({ path: `./.env.${process.env.ENV_TYPE}` });
const path = require('path');
const webpack = require('webpack');

const devServerPort = process.env.DEV_SERVER_PORT || 3000;
const mode = process.env.ENV;

module.exports = {
  mode,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: './public',
    publicPath: `http://0.0.0.0:${devServerPort}`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['ENV']),
  ],
  devServer: {
    stats: 'errors-only',
    port: devServerPort,
  },
};