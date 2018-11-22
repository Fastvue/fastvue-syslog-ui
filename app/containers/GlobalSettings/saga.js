import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_GLOBAL_SETTINGS, UPDATE_GLOBAL_SETTINGS } from './constants';
import {
  fetchGlobalSettingsFail,
  fetchGlobalSettingsSuccess,
  updateGlobalSettingsFail,
  updateGlobalSettingsSuccess
} from './actions';

export function* fetchGlobalSettings() {
  const requestURL = `${process.env.API_URL}/api/settings/globalsettings`;

  try {
    const globalSettings = yield call(request, requestURL);
    yield put(fetchGlobalSettingsSuccess(globalSettings));
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }
}

export function* updateGlobalSettings(action) {
  console.log(action.globalSettings);
  const requestURL = `${process.env.API_URL}/api/settings/setglobalsettings`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ...action.globalSettings
    })
  };

  try {
    yield call(request, requestURL, requestOptions);
    yield put(updateGlobalSettingsSuccess());
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export default function* globalSettingsSaga() {
  yield takeLatest(FETCH_GLOBAL_SETTINGS, fetchGlobalSettings);
  yield takeLatest(UPDATE_GLOBAL_SETTINGS, updateGlobalSettings);
}
