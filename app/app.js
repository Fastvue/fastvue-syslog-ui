/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignOutAlt,
  faCog,
  faHeadphones,
  faPlus,
  faEye,
  faTimes,
  faExclamationCircle,
  faCircleNotch,
  faChevronLeft,
  faSortAmountDown,
  faSortAmountUp,
  faExchangeAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

// Import root app
import App from 'containers';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.png';
/* eslint-enable import/no-webpack-loader-syntax */

library.add(
  faSignOutAlt,
  faCog,
  faHeadphones,
  faPlus,
  faEye,
  faTimes,
  faExclamationCircle,
  faCircleNotch,
  faChevronLeft,
  faSortAmountDown,
  faSortAmountUp,
  faExchangeAlt,
  faCheck
);

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  }
);

const MOUNT_NODE = document.getElementById('app');
const history = createHistory();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

export default store;
