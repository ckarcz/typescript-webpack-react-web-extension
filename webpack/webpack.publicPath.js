/* global __webpack_public_path__ DEV_SRV DEV_SRV_URL */
/* eslint no-global-assign: 0 camelcase: 0 */

const url = require('url');

// fixes dev-server HMR hot updates
if (process.env.DEV_SRV) {
  __webpack_public_path__ = url.resolve(process.env.DEV_SRV_URL, '/');
}
