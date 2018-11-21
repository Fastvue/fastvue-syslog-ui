import { call, put, takeLatest, actionChannel } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOGIN,
  FETCH_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS
} from './constants';
import {
  fetchGlobalSettingsFail,
  fetchGlobalSettingsSuccess,
  updateGlobalSettingsFail,
  updateGlobalSettingsSuccess
} from './actions';

export function* login() {
  const requestURL = `${process.env.API_URL}/auth/login`;
  const requestParams = {
    u: 'admin',
    p: 'admin'
  };
  const fetchParams = {
    method: 'POST', // or 'PUT'
    body: requestParams, // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = yield call(request, requestURL, fetchParams);
    // yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    // yield put(fetchSourceListFail(err));
  }
}

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

export default function* homePageSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(FETCH_GLOBAL_SETTINGS, fetchGlobalSettings);
  yield takeLatest(UPDATE_GLOBAL_SETTINGS, updateGlobalSettings);
}
