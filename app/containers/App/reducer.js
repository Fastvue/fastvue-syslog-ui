import { fromJS } from 'immutable';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_INIT_CONFIG_SUCCESS,
  FETCH_APP_VERSION_SUCCESS,
  LOGOUT,
  FETCH_GLOBAL_SETTINGS_SUCCESS,
  UPDATE_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS_SUCCESS
} from './constants';

const initialState = fromJS({
  isLoggedIn: false,
  isLoggedOut: false,
  isLoggingIn: false,
  initConfig: 'null',
  appVersion: '',
  globalSettings: {},
  updateGlobalSettingsLoading: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('isLoggingIn', true);
    case LOGOUT:
      return state.set('isLoggedOut', true).set('isLoggedIn', false);
    case LOGIN_SUCCESS:
      return state
        .set('isLoggingIn', false)
        .set('isLoggedIn', true)
        .set('isLoggedOut', false);
    case LOGIN_FAIL:
      return state.set('isLoggingIn', false).set('isLoggedIn', false);
    case FETCH_INIT_CONFIG_SUCCESS:
      return state.set('initConfig', action.initConfig);
    case FETCH_APP_VERSION_SUCCESS:
      return state.set('appVersion', action.appVersion);
    case FETCH_GLOBAL_SETTINGS_SUCCESS:
      return state.set('globalSettings', fromJS(action.globalSettings));
    case UPDATE_GLOBAL_SETTINGS:
      return state.set('updateGlobalSettingsLoading', true);
    case UPDATE_GLOBAL_SETTINGS_SUCCESS:
      return state.set('updateGlobalSettingsLoading', false);
    case UPDATE_GLOBAL_SETTINGS_FAIL:
      return state.set('updateGlobalSettingsLoading', false);
    default:
      return state;
  }
}

export default appReducer;
