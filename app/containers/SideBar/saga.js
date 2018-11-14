/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_SOURCE_LIST } from './constants';
import { fetchSourceListSuccess, fetchSourceListFail } from './actions';

export function* fetchSourcesList() {
  const requestURL = `${process.env.API_URL}/api/sources/list`;

  try {
    const sources = yield call(request, requestURL);
    console.log(sources);
    yield put(fetchSourceListSuccess(sources));
  } catch (err) {
    yield put(fetchSourceListFail(err));
  }
}

export default function* sideBarSaga() {
  yield takeLatest(FETCH_SOURCE_LIST, fetchSourcesList);
}
