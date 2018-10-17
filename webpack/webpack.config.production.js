/**
 * WEBPACK_ENV=production webpack config.
 */

const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseWebpackConfig = require('./webpack.config.base');

const createProdConfig = () => {
  const baseConfig = baseWebpackConfig.create();

  const envConfig = {
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
                pretty: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                minimize: true
              }
            },
            'css-loader'
          ]
        }
      ]
    }
  };

  const mergedConfig = merge(baseConfig, envConfig);
  return mergedConfig;
};

module.exports = {
  create: createProdConfig
};
