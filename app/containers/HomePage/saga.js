import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOGIN } from './constants';
import {} from './actions';

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

export default function* homePageSaga() {
  yield takeLatest(LOGIN, login);
}
