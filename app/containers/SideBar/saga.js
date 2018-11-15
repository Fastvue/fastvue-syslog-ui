import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  FETCH_SOURCE_LIST,
  TOGGLE_SOURCE_AUTO_DISCOVER_BUTTON
} from './constants';
import { fetchSourceListSuccess, fetchSourceListFail } from './actions';

export function* fetchSourcesList() {
  console.log(process);
  const requestURL = `${process.env.API_URL}/api/sources/list`;

  try {
    const sourceList = yield call(request, requestURL);
    console.log('ok tested', sourceList);
    yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    yield put(fetchSourceListFail(err));
    console.log(err);
  }
}

export default function* sideBarSaga() {
  yield takeLatest(FETCH_SOURCE_LIST, fetchSourcesList);
  // yield takeLatest(TOGGLE_SOURCE_AUTO_DISCOVER_BUTTON, fetchSourcesList);
}
