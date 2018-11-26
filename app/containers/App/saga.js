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
  const requestOptions = {
    method: 'post',
    url: '/api/auth/login',
    data: action.credentials
  };
  try {
    const res = yield call(request, requestOptions);

    if (res === undefined || res === '') {
      yield put(loginFail());
    } else {
      document.cookie = `t=${res}`;
      yield put(loginSuccess());
    }
  } catch (err) {
    yield put(loginFail());
  }
}

export function* fetchInitConfig() {
  const requestOptions = {
    url: '/api/settings/getinitconfigured'
  };
  try {
    const config = yield call(request, requestOptions);
    if (config === undefined) {
      yield put(logout());
    } else {
      yield put(fetchInitConfigSuccess(config));
    }
  } catch (err) {
    yield put(fetchInitConfigFail());
  }
}

export function* fetchAppVersion() {
  const requestOptions = {
    url: '/api/appinfo/version'
  };

  try {
    const appVersion = yield call(request, requestOptions);

    yield put(fetchAppVersionSuccess(appVersion));
  } catch (err) {
    yield put(fetchAppVersionFail(err));
  }
}

export function* fetchGlobalSettings() {
  const requestOptions = {
    method: 'get',
    url: '/api/settings/globalsettings'
  };

  try {
    const globalSettings = yield call(request, requestOptions);

    yield put(fetchGlobalSettingsSuccess(globalSettings));
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }
}

export function* updateGlobalSettings(action) {
  const requestOptions = {
    method: 'post',
    url: '/api/settings/setglobalsettings',
    data: action.globalSettings
  };
  try {
    const res = yield call(request, requestOptions);

    yield put(updateGlobalSettingsSuccess());
    yield put(fetchGlobalSettingsSuccess(action.globalSettings));
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export function* fetchAndUpdateGlobalSettings(action) {
  const requestOptions = {
    method: 'get',
    url: '/api/settings/globalsettings',
    data: action.globalSettings
  };

  let fetchedGlobalSettings;
  try {
    fetchedGlobalSettings = yield call(request, requestOptions);
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }

  const toUpdateGlobalSettings = {
    ...fetchedGlobalSettings,
    autoDiscover: !action.autoDiscover
  };

  const requestOptionsUpdate = {
    method: 'post',
    url: '/api/settings/setglobalsettings',
    data: toUpdateGlobalSettings
  };
  try {
    const res = yield call(request, requestOptionsUpdate);

    yield put(fetchGlobalSettingsSuccess(toUpdateGlobalSettings));
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export function* updatePorts(action) {
  const requestOptions = {
    method: 'post',
    url: '/api/settings/setports',
    data: action.ports.split(',')
  };
  try {
    const res = yield call(request, requestOptions);
    if (res === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
    yield put(updatePortsSuccess());
    yield put(fetchPortsSuccess(action.ports));
  } catch (err) {
    yield put(updatePortsFail(err));
  }
}

export function* fetchPorts() {
  const requestOptions = {
    method: 'get',
    url: '/api/settings/ports'
  };

  try {
    const ports = yield call(request, requestOptions);
    if (ports === undefined) {
      yield put(logout());
    }
    yield put(fetchPortsSuccess(ports.join(',')));
  } catch (err) {
    yield put(fetchPortsFail(err));
  }
}

export function* updateInitConfig() {
  const requestOptions = {
    method: 'post',
    url: '/api/settings/setinitconfigured',
    data: { initConfigured: true }
  };

  try {
    const res = yield call(request, requestOptions);
    if (res === undefined) {
      yield put(logout());
    }
  } catch (err) {}
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
