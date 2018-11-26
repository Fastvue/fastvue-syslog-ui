import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FETCH_INIT_CONFIG,
  FETCH_INIT_CONFIG_FAIL,
  FETCH_INIT_CONFIG_SUCCESS,
  FETCH_APP_VERSION,
  FETCH_APP_VERSION_SUCCESS,
  FETCH_APP_VERSION_FAIL,
  FETCH_GLOBAL_SETTINGS,
  FETCH_GLOBAL_SETTINGS_SUCCESS,
  FETCH_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS_SUCCESS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS_SUCCESS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS_FAIL,
  FETCH_PORTS,
  FETCH_PORTS_SUCCESS,
  FETCH_PORTS_FAIL,
  UPDATE_PORTS,
  UPDATE_PORTS_SUCCESS,
  UPDATE_PORTS_FAIL,
  UPDATE_INIT_CONFIG
} from './constants';

export const login = (credentials) => ({
  type: LOGIN,
  credentials
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFail = () => ({
  type: LOGIN_FAIL
});

export const logout = () => ({
  type: LOGOUT
});

export const fetchInitConfig = () => ({
  type: FETCH_INIT_CONFIG
});

export const fetchInitConfigSuccess = (initConfig) => ({
  type: FETCH_INIT_CONFIG_SUCCESS,
  initConfig
});

export const fetchInitConfigFail = () => ({
  type: FETCH_INIT_CONFIG_FAIL
});

export const fetchAppVersion = () => ({
  type: FETCH_APP_VERSION
});

export const fetchAppVersionSuccess = (appVersion) => ({
  type: FETCH_APP_VERSION_SUCCESS,
  appVersion
});

export const fetchAppVersionFail = () => ({
  type: FETCH_APP_VERSION_FAIL
});

export const fetchGlobalSettings = () => ({
  type: FETCH_GLOBAL_SETTINGS
});

export const fetchGlobalSettingsSuccess = (globalSettings) => ({
  type: FETCH_GLOBAL_SETTINGS_SUCCESS,
  globalSettings
});
export const fetchGlobalSettingsFail = () => ({
  type: FETCH_GLOBAL_SETTINGS_FAIL
});

export const updateGlobalSettings = (globalSettings) => ({
  type: UPDATE_GLOBAL_SETTINGS,
  globalSettings
});

export const updateGlobalSettingsSuccess = () => ({
  type: UPDATE_GLOBAL_SETTINGS_SUCCESS
});
export const updateGlobalSettingsFail = () => ({
  type: UPDATE_GLOBAL_SETTINGS_FAIL
});

export const fetchAndUpdateGlobalSettings = (autoDiscover) => ({
  type: FETCH_AND_UPDATE_GLOBAL_SETTINGS,
  autoDiscover
});

export const fetchAndUpdateGlobalSettingsSuccess = () => ({
  type: FETCH_AND_UPDATE_GLOBAL_SETTINGS_SUCCESS
});
export const fetchAndUpdateGlobalSettingsFail = () => ({
  type: FETCH_AND_UPDATE_GLOBAL_SETTINGS_FAIL
});

export const updatePorts = (ports) => ({
  type: UPDATE_PORTS,
  ports
});

export const updatePortsSuccess = () => ({
  type: UPDATE_PORTS_SUCCESS
});

export const updatePortsFail = (err) => ({
  type: UPDATE_PORTS_FAIL,
  err
});

export const fetchPorts = () => ({
  type: FETCH_PORTS
});

export const fetchPortsSuccess = (ports) => ({
  type: FETCH_PORTS_SUCCESS,
  ports
});

export const fetchPortsFail = (err) => ({
  type: FETCH_PORTS_FAIL,
  err
});

export const updateInitConfig = () => ({
  type: UPDATE_INIT_CONFIG
});
