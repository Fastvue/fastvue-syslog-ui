import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOGIN } from './constants';
import { loginSuccess, loginFail } from './actions';

export function* login(action) {
  console.log('app login', action);
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
    console.log(res);

    document.cookie = `t=${res}`;
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFail());
  }
}

// export function* fetchAppVersion() {
//   const requestURL = `${process.env.API_URL}/api/appinfo/version`;

//   try {
//     const appVersion = yield call(request, requestURL);
//     yield put(fetchAppVersionSuccess(appVersion));
//   } catch (err) {
//     yield put(fetchAppVersionFail(err));
//   }
// }

export default function* appSaga() {
  yield takeLatest(LOGIN, login);
}
