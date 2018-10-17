/**
 * Base/Common webpack config.
 */

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRootDir = path.join(__dirname, '..');
const projectOutputDir = path.resolve(projectRootDir, 'dist', process.env.WEBPACK_OUTPUTDIR || process.env.WEBPACK_ENV);

const nodeProjectRootDir = projectRootDir;
const webpackContextDir = nodeProjectRootDir;

const customPublicPath = path.join(__dirname, 'webpack.publicPath.js');

const createBaseConfig = () => {
  return {
    context: webpackContextDir,
    entry: {
      background: [customPublicPath, path.join(projectRootDir, 'src/extension/background/background.js')],
      popup: [customPublicPath, path.join(projectRootDir, 'src/extension/popup/popup.js')],
      options: [customPublicPath, path.join(projectRootDir, 'src/extension/options/options.js')],
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    output: {
      path: projectOutputDir,
      filename: 'js/[name].bundle.js',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
      }),
      new WriteFilePlugin(),
      new CleanWebpackPlugin([projectOutputDir], {
        root: projectRootDir,
        verbose: true,
        beforeEmit: true
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectRootDir, 'src/extension/background/background.pug'),
        filename: 'html/background.html',
        chunks: ['background'],
        inject: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectRootDir, 'src/extension/popup/popup.pug'),
        filename: 'html/popup.html',
        chunks: ['popup'],
        inject: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectRootDir, 'src/extension/options/options.pug'),
        filename: 'html/options.html',
        chunks: ['options'],
        inject: false,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CopyWebpackPlugin([{
        from: path.join(projectRootDir, `src/extension/manifest.${process.env.WEBPACK_ENV}.json`),
        to: 'manifest.json'
      }]),
      new CopyWebpackPlugin([{
        from: path.join(projectRootDir, 'src/assets'),
        to: 'assets'
      }]),
    ]
  };
};

module.exports = {
  projectRootDir: projectRootDir,
  projectOutputDir: projectOutputDir,
  create: createBaseConfig
};
