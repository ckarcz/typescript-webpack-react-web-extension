/**
 * Extension options page script.
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages
 * https://developer.chrome.com/extensions/options
 */

require('./options.css');

import LoggerFactory from '../../util/loggerFactory';
import React from 'react';
import ReactDOM from 'react-dom';
import OptionsApp from '../../app/containers/OptionsApp';
import createStore from '../../app/store/configureStore';

const logger = LoggerFactory.createLogger('options.js');
logger.info('Options script loaded.');

browser.storage.local.get('options', (data) => {
  const { options } = data;
  const initialState = JSON.parse(options || '{}');
  ReactDOM.render(
    <OptionsApp store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
