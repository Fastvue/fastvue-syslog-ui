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
  const axiosOptions = {
    method: 'post',
    url: '/api/auth/login',
    data: action.credentials
  };
  try {
    const res = yield call(request, axiosOptions);
    document.cookie = `t=${res}`;
    if (res === undefined || res === '') {
      // yield put(logout());
      yield put(loginFail());
    } else {
      yield put(loginSuccess());
    }
  } catch (err) {
    yield put(loginFail());
  }
}

export function* fetchInitConfig() {
  const axiosOptions = {
    url: '/api/settings/getinitconfigured'
  };
  try {
    const config = yield call(request, axiosOptions);
    if (config === undefined) {
      yield put(logout());
    } else {
      yield put(fetchInitConfigSuccess(config));
    }
  } catch (err) {
    yield put(fetchInitConfigFail());
    yield put(logout());
  }
}

export function* fetchAppVersion() {
  const axiosOptions = {
    url: '/api/appinfo/version'
  };

  try {
    const appVersion = yield call(request, axiosOptions);
    if (appVersion === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }

    yield put(fetchAppVersionSuccess(appVersion));
  } catch (err) {
    yield put(fetchAppVersionFail(err));
  }
}

export function* fetchGlobalSettings() {
  const axiosOptions = {
    method: 'get',
    url: '/api/settings/globalsettings'
  };

  try {
    const globalSettings = yield call(request, axiosOptions);
    if (globalSettings === undefined) {
      // yield put(push('/'));
      yield put(logout());
      return;
    }
    yield put(fetchGlobalSettingsSuccess(globalSettings));
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }
}

export function* updateGlobalSettings(action) {
  // const requestURL = `/api/settings/setglobalsettings`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     ...action.globalSettings
  //   })
  // };

  const axiosOptions = {
    method: 'post',
    url: '/api/settings/setglobalsettings',
    data: action.globalSettings
  };
  try {
    const res = yield call(request, axiosOptions);
    if (res === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
    yield put(updateGlobalSettingsSuccess());
    yield put(fetchGlobalSettingsSuccess(action.globalSettings));
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export function* fetchAndUpdateGlobalSettings(action) {
  // const requestURL = ;

  const axiosOptions = {
    method: 'get',
    url: '/api/settings/globalsettings',
    data: action.globalSettings
  };

  let fetchedGlobalSettings;
  try {
    fetchedGlobalSettings = yield call(request, axiosOptions);
    if (fetchGlobalSettings === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
  } catch (err) {
    yield put(fetchGlobalSettingsFail(err));
  }

  const toUpdateGlobalSettings = {
    ...fetchedGlobalSettings,
    autoDiscover: !action.autoDiscover
  };

  // const updateRequestURL = `${
  //   process.env.API_URL
  // }/api/settings/setglobalsettings`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     ...toUpdateGlobalSettings
  //   })
  // };

  const axiosOptionsUpdate = {
    method: 'post',
    url: '/api/settings/setglobalsettings',
    data: toUpdateGlobalSettings
  };
  try {
    const res = yield call(request, axiosOptionsUpdate);
    if (res === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
    yield put(fetchGlobalSettingsSuccess(toUpdateGlobalSettings));
  } catch (err) {
    yield put(updateGlobalSettingsFail(err));
  }
}

export function* updatePorts(action) {
  // const requestURL = `/api/settings/setports`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify(action.ports.split(','))
  // };

  const axiosOptions = {
    method: 'post',
    url: '/api/settings/setports',
    data: action.ports.split(',')
  };
  try {
    const res = yield call(request, axiosOptions);
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
  // const requestURL =

  const axiosOptions = {
    method: 'get',
    url: '/api/settings/ports'
  };

  try {
    const ports = yield call(request, axiosOptions);
    if (ports === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
    yield put(fetchPortsSuccess(ports.join(',')));
  } catch (err) {
    yield put(fetchPortsFail(err));
  }
}

export function* updateInitConfig() {
  // const requestURL = `/api/settings/setinitconfigured`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify({ initConfigured: true })
  // };

  const axiosOptions = {
    method: 'post',
    url: '/api/settings/setinitconfigured',
    data: { initConfigured: true }
  };

  try {
    const res = yield call(request, axiosOptions);
    if (res === undefined) {
      // yield put(push('/'));
      yield put(logout());
    }
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
