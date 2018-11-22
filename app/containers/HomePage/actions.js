import {
  FETCH_GLOBAL_SETTINGS,
  FETCH_GLOBAL_SETTINGS_SUCCESS,
  FETCH_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS_SUCCESS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS_SUCCESS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS_FAIL,
  FETCH_APP_VERSION,
  FETCH_APP_VERSION_SUCCESS,
  FETCH_APP_VERSION_FAIL
} from './constants';

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
