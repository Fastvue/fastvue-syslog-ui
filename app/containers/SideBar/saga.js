import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_SOURCE_LIST, TOGGLE_SOURCE_AUTO_DISCOVER } from './constants';
import { fetchSourceListSuccess, fetchSourceListFail } from './actions';

export function* fetchSourcesList() {
  const requestURL = `${process.env.API_URL}/api/sources/list`;

  try {
    const sourceList = yield call(request, requestURL);
    yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    yield put(fetchSourceListFail(err));
  }
}

export function* toggleSourceAutoDiscover(action) {
  const requestURL = `${process.env.API_URL}/api/sources/${
    action.isSourceEnabled ? 'enable' : 'disable'
  }`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ id: action.sourceId })
  };

  try {
    const sourceList = yield call(request, requestURL, requestOptions);
    console.log(sourceList);
    // yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    // yield put(fetchSourceListFail(err));
    console.log(err);
  }
}

export default function* sideBarSaga() {
  yield takeLatest(FETCH_SOURCE_LIST, fetchSourcesList);
  yield takeLatest(TOGGLE_SOURCE_AUTO_DISCOVER, toggleSourceAutoDiscover);
}
