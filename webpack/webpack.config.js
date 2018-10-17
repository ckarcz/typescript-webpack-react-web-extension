/**
 * Webpack config entry point.
 */

const path = require('path');
const colors = require('colors');

module.exports = () => {
  console.log(colors.blue('Webpack env: '), process.env.WEBPACK_ENV);
  const webpackConfigPath = path.resolve(__dirname, `./webpack.config.${process.env.WEBPACK_ENV}.js`);
  console.log(colors.blue('Webpack file: '), webpackConfigPath);
  const webpackConfigFactory = require(webpackConfigPath);
  const webpackConfig = webpackConfigFactory.create();
  console.log();
  return webpackConfig;
};
