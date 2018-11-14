import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_SOURCE_LIST } from './constants';
import { fetchSourceListSuccess, fetchSourceListFail } from './actions';

export function* fetchSourcesList() {
  console.log(process);
  const requestURL = `${process.env.API_URL}/api/sources/list`;

  try {
    const sourceList = yield call(request, requestURL);
    console.log(sourceList);
    yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    yield put(fetchSourceListFail(err));
    console.log(err);
  }
}

export default function* sideBarSaga() {
  yield takeLatest(FETCH_SOURCE_LIST, fetchSourcesList);
}
