import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
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
  const requestOptions = {
    method: 'get',
    url: '/api/sources/list'
  };
  try {
    const sourceList = yield call(request, requestOptions);

    yield put(fetchSourceListSuccess(sourceList));
  } catch (err) {
    yield put(fetchSourceListFail(err));
  }
}

export function* toggleSourceAutoDiscover(action) {
  const requestOptions = {
    method: 'post',
    url: `/api/sources/${!action.isSourceEnabled ? 'enable' : 'disable'}`,
    data: { id: action.sourceId }
  };

  yield call(request, requestOptions);
  yield put(fetchSourceList());
}

export function* addOrUpdateSource(action) {
  const params = action.fields;
  if (action.id) {
    params.id = action.id;
  }
  const requestOptions = {
    method: 'post',
    url: '/api/sources/add',
    data: params
  };

  try {
    yield call(request, requestOptions);

    yield put(
      addOrUpdateSourceSuccess(!action.id ? action.fields.displayName : '')
    );
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
  const requestOptions = {
    method: 'post',
    url: '/api/sources/delete',
    data: { id: action.sourceId }
  };

  try {
    const res = yield call(request, requestOptions);
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
