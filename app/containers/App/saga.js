import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import {
  LOGIN,
  FETCH_INIT_CONFIG,
  FETCH_APP_VERSION,
  FETCH_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS,
  FETCH_AND_UPDATE_GLOBAL_SETTINGS,
  UPDATE_PORTS,
  FETCH_PORTS,
  UPDATE_INIT_CONFIG
} from './constants';
import {
  loginSuccess,
  loginFail,
  fetchInitConfigFail,
  fetchInitConfigSuccess,
  fetchAppVersionSuccess,
  fetchAppVersionFail,
  logout,
  fetchGlobalSettingsFail,
  fetchGlobalSettingsSuccess,
  updateGlobalSettingsFail,
  updateGlobalSettingsSuccess,
  updatePortsSuccess,
  updatePortsFail,
  fetchPortsFail,
  fetchPortsSuccess
} from './actions';

export function* login(action) {
  const requestURL = `${process.env.API_URL}/api/auth/login`;
  const requestParams = JSON.stringify({
    ...action.credentials
  });
  const fetchParams = {
    method: 'POST',
    body: requestParams
  };

  try {
    const res = yield call(request, requestURL, fetchParams);
    document.cookie = `t=${res}`;
    if (res === undefined) {
      yield put(push('/'));
    }
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFail());
  }
}

export function* fetchInitConfig() {
  const requestURL = `${process.env.API_URL}/api/settings/getinitconfigured`;
  try {
    const config = yield call(request, requestURL);

    yield put(fetchInitConfigSuccess(config));
  } catch (err) {
    yield put(fetchInitConfigFail());
    yield put(logout());
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

export function* updatePorts(action) {
  const requestURL = `${process.env.API_URL}/api/settings/setports`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(action.ports.split(','))
  };

  try {
    yield call(request, requestURL, requestOptions);
    yield put(updatePortsSuccess());
    yield put(fetchPortsSuccess(action.ports));
  } catch (err) {
    yield put(updatePortsFail(err));
  }
}

export function* fetchPorts() {
  const requestURL = `${process.env.API_URL}/api/settings/ports`;

  try {
    const ports = yield call(request, requestURL);
    yield put(fetchPortsSuccess(ports.join(',')));
  } catch (err) {
    yield put(fetchPortsFail(err));
  }
}

export function* updateInitConfig() {
  const requestURL = `${process.env.API_URL}/api/settings/setinitconfigured`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ initConfigured: true })
  };

  try {
    yield call(request, requestURL, requestOptions);
    // yield put(updatePortsSuccess());
  } catch (err) {
    // yield put(updatePortsFail(err));
  }
}

export default function* appSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(FETCH_INIT_CONFIG, fetchInitConfig);

  yield takeLatest(FETCH_APP_VERSION, fetchAppVersion);
  yield takeLatest(
    FETCH_AND_UPDATE_GLOBAL_SETTINGS,
    fetchAndUpdateGlobalSettings
  );
  yield takeLatest(FETCH_GLOBAL_SETTINGS, fetchGlobalSettings);
  yield takeLatest(UPDATE_GLOBAL_SETTINGS, updateGlobalSettings);
  yield takeLatest(UPDATE_PORTS, updatePorts);
  yield takeLatest(FETCH_PORTS, fetchPorts);
  yield takeLatest(UPDATE_INIT_CONFIG, updateInitConfig);
}
