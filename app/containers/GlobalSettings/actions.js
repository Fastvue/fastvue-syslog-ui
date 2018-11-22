import {
  FETCH_GLOBAL_SETTINGS,
  FETCH_GLOBAL_SETTINGS_SUCCESS,
  FETCH_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS_SUCCESS
} from './constants';

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
