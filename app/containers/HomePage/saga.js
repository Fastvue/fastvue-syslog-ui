import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  FETCH_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS,
  FETCH_APP_VERSION
} from './constants';
import {
  fetchGlobalSettingsFail,
  fetchGlobalSettingsSuccess,
  updateGlobalSettingsFail,
  updateGlobalSettingsSuccess,
  fetchAppVersionSuccess,
  fetchAppVersionFail
} from './actions';

// export function* login() {
//   const requestURL = `${process.env.API_URL}/auth/login`;
//   const requestParams = {
//     u: 'admin',
//     p: 'admin'
//   };
//   const fetchParams = {
//     method: 'POST', // or 'PUT'
//     body: requestParams, // data can be `string` or {object}!
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   try {
//     const res = yield call(request, requestURL, fetchParams);
//     // yield put(fetchSourceListSuccess(sourceList));
//   } catch (err) {
//     // yield put(fetchSourceListFail(err));
//   }
// }

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

export function* fetchAppVersion() {
  const requestURL = `${process.env.API_URL}/api/appinfo/version`;

  try {
    const appVersion = yield call(request, requestURL);
    yield put(fetchAppVersionSuccess(appVersion));
  } catch (err) {
    yield put(fetchAppVersionFail(err));
  }
}

export function* fetchAndUpdateGlobalSettings(action) {
  const requestURL = `${process.env.API_URL}/api/settings/globalsettings`;

  let fetchedGlobalSettings;
  try {
    fetchedGlobalSettings = yield call(request, requestURL);
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }

  const toUpdateGlobalSettings = {
    ...fetchedGlobalSettings,
    autoDiscover: !action.autoDiscover
  };

  const updateRequestURL = `${
    process.env.API_URL
  }/api/settings/setglobalsettings`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ...toUpdateGlobalSettings
    })
  };
  try {
    yield call(request, updateRequestURL, requestOptions);
    yield put(fetchGlobalSettingsSuccess(toUpdateGlobalSettings));
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export default function* homePageSaga() {
  // yield takeLatest(LOGIN, login);

  yield takeLatest(
    FETCH_AND_UPDATE_GLOBAL_SETTINGS,
    fetchAndUpdateGlobalSettings
  );
  yield takeLatest(FETCH_GLOBAL_SETTINGS, fetchGlobalSettings);
  yield takeLatest(UPDATE_GLOBAL_SETTINGS, updateGlobalSettings);
  yield takeLatest(FETCH_APP_VERSION, fetchAppVersion);
}
