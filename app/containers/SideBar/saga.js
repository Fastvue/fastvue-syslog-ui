import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-dom';
import {
  FETCH_SOURCE_LIST,
  TOGGLE_SOURCE_AUTO_DISCOVER,
  ADD_OR_UPDATE_SOURCE,
  DELETE_SOURCE
} from './constants';
import {
  fetchSourceListSuccess,
  fetchSourceListFail,
  addOrUpdateSourceSuccess,
  addOrUpdateSourceFail,
  deleteSourceSuccess,
  deleteSourceFail,
  closeSourceEditor,
  fetchSourceList,
  closeSyslogSourceAddForm,
  toggleAddSourceSuccessModal
} from './actions';

export function* fetchSourcesListAPI() {
  const requestURL = `${process.env.API_URL}/api/sources/list`;

  try {
    const sourceList = yield call(request, requestURL);
    if (sourceList === 'undefined') {
      yield put(push('/'));
    }
    yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    yield put(fetchSourceListFail(err));
  }
}

export function* toggleSourceAutoDiscover(action) {
  const requestURL = `${process.env.API_URL}/api/sources/${
    !action.isSourceEnabled ? 'enable' : 'disable'
  }`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ id: action.sourceId })
  };

  try {
    yield call(request, requestURL, requestOptions);
    yield put(fetchSourceList());
  } catch (err) {
    // yield put(fetchSourceListFail(err));
  }
}

export function* addOrUpdateSource(action) {
  const requestURL = `${process.env.API_URL}/api/sources/add`;
  const params = action.fields;
  if (action.id) {
    params.id = action.id;
  }
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(params)
  };

  try {
    const res = yield call(request, requestURL, requestOptions);
    yield put(addOrUpdateSourceSuccess(res));
    yield put(fetchSourceList());
    if (action.id) {
      yield put(closeSourceEditor());
    } else {
      yield put(closeSyslogSourceAddForm());
      yield put(toggleAddSourceSuccessModal());
    }
  } catch (err) {
    yield put(addOrUpdateSourceFail(err));
  }
}

export function* deleteSource(action) {
  const requestURL = `${process.env.API_URL}/api/sources/delete`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ id: action.sourceId })
  };

  try {
    const res = yield call(request, requestURL, requestOptions);
    yield put(fetchSourceList());
    yield put(deleteSourceSuccess(res));
  } catch (err) {
    yield put(deleteSourceFail(err));
  }
}

export default function* sideBarSaga() {
  yield takeLatest(FETCH_SOURCE_LIST, fetchSourcesListAPI);
  yield takeLatest(TOGGLE_SOURCE_AUTO_DISCOVER, toggleSourceAutoDiscover);
  yield takeLatest(ADD_OR_UPDATE_SOURCE, addOrUpdateSource);
  yield takeLatest(DELETE_SOURCE, deleteSource);
}
