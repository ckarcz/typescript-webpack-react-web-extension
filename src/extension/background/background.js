/**
 * Extension backgroung page script.
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background
 * https://developer.chrome.com/extensions/background_pages
 */

const browser = require('webextension-polyfill');
import LoggerFactory from '../../util/LoggerFactory';

const logger = LoggerFactory.createLogger('background.js');
logger.info('Background script loaded.');

browser.runtime.getPlatformInfo()
  .then(info => logger.info('Platform info: ', info));
