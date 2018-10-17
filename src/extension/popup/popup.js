/**
 * Extension popup page script.
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups
 * https://developer.chrome.com/extensions/browserAction#popups
 */

require('./popup.css');

const browser = require('webextension-polyfill');
import LoggerFactory from '../../util/LogFactory';
import React from 'react';
import ReactDOM from 'react-dom';
import PopupApp from '../../app/containers/PopupApp';
import createStore from '../../app/store/configureStore';

const logger = LoggerFactory.createLogger('popup.js');
logger.info('Popup script loaded.');

browser.storage.local.get('state')
  .then(data => {
    const { state } = data;
    const initialState = JSON.parse(state || '{}');
    ReactDOM.render(
      <PopupApp store={createStore(initialState)} />,
      document.querySelector('#root')
    );
  });
