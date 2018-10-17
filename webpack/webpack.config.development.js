/**
 * WEBPACK_ENV=development webpack config.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base.js');

const createDevConfig = () => {
  const baseConfig = baseWebpackConfig.create();

  const DEV_SRV = process.env.DEV_SRV || false;
  const DEV_SRV_HTTPS = process.env.DEV_SRV_HTTPS || true;
  const DEV_SRV_HOST = process.env.DEV_SRV_HOST ? JSON.stringify(process.env.DEV_SRV_HOST) : '127.0.0.1';
  const DEV_SRV_PORT = process.env.DEV_SRV_PORT || 3000;
  const DEV_SRV_URL = `${DEV_SRV_HTTPS ? 'https' : 'http'}://${DEV_SRV_HOST}:${DEV_SRV_PORT}`;

  const envConfig = {
    output: {
      hotUpdateChunkFilename: '.hot/hot-update.js',
      hotUpdateMainFilename: '.hot/hot-update.json'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          DEV_SRV: DEV_SRV,
          DEV_SRV_URL: JSON.stringify(DEV_SRV_URL)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          loader: 'babel-loader'
        },
        {
          test: /\.pug/,
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'pug-html-loader',
              query: {
                pretty: true,
                data: {
                  NODE_ENV: process.env.NODE_ENV,
                  DEV_SRV: DEV_SRV,
                  DEV_SRV_URL: DEV_SRV_URL
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        }
      ]
    },
    devtool: 'source-map',
    devServer: {
      https: DEV_SRV_HTTPS,
      host: DEV_SRV_HOST,
      port: DEV_SRV_PORT,
      contentBase: baseWebpackConfig.projectOutputDir,
      publicPath: '/',
      hot: true,
      hotOnly: true,
      compress: false,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  };

  const mergedConfig = merge(baseConfig, envConfig);
  return mergedConfig;
};

module.exports = {
  create: createDevConfig
};
