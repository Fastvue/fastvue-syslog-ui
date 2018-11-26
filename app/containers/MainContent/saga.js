import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-dom';

import {
  FETCH_SOURCE_STATS,
  FETCH_GLOBAL_STATS,
  FETCH_SOURCE_FILES,
  FETCH_SOURCE_ARCHIVES
} from './constants';
import {
  fetchSourceStatsSuccess,
  fetchSourceStatsFail,
  fetchSourceFilesSuccess,
  fetchSourceFilesFail,
  fetchSourceArchivesFail,
  fetchSourceArchivesSuccess,
  fetchGlobalStatsFail,
  fetchGlobalStatsSuccess
} from './actions';

export function* fetchSourcesStatsAPI(action) {
  // const requestURL = `/api/sources/stats`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify()
  // };

  const axiosOptions = {
    method: 'POST',
    url: '/api/sources/stats',
    data: {
      id: action.sourceId
    }
  };

  try {
    const stats = yield call(request, axiosOptions);
    if (stats === undefined) {
      yield put(push('/'));
    }

    yield put(fetchSourceStatsSuccess(stats));
  } catch (err) {
    yield put(fetchSourceStatsFail(err));
  }
}

export function* fetchGlobalStatsAPI() {
  // const requestURL = `/api/sources/globalstats`;

  const axiosOptions = {
    method: 'get',
    url: '/api/sources/globalstats'
  };

  try {
    const globalStats = yield call(request, axiosOptions);
    if (globalStats === undefined) {
      yield put(push('/'));
    }
    yield put(fetchGlobalStatsSuccess(globalStats));
  } catch (err) {
    yield put(fetchGlobalStatsFail(err));
  }
}

export function* fetchSourcesFilesAPI(action) {
  // const requestURL =;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify()
  // };

  const axiosOptions = {
    method: 'post',
    url: '/api/sources/filelist',
    data: {
      id: action.sourceId
    }
  };

  try {
    const files = yield call(request, axiosOptions);

    if (files === undefined) {
      yield put(push('/'));
    }
    yield put(fetchSourceFilesSuccess(files));
  } catch (err) {
    yield put(fetchSourceFilesFail(err));
  }
}

export function* fetchSourceArchivesAPI(action) {
  // const requestURL = `/api/sources/archivelist`;
  // const requestOptions = {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     id: action.sourceId
  //   })
  // };
  const axiosOptions = {
    method: 'post',
    url: '/api/sources/archivelist',
    data: {
      id: action.sourceId
    }
  };

  try {
    const archives = yield call(request, axiosOptions);
    if (archives === undefined) {
      yield put(push('/'));
    }

    yield put(fetchSourceArchivesSuccess(archives));
  } catch (err) {
    yield put(fetchSourceArchivesFail(err));
  }
}

export default function* mainContentSaga() {
  yield takeLatest(FETCH_SOURCE_STATS, fetchSourcesStatsAPI);
  yield takeLatest(FETCH_SOURCE_FILES, fetchSourcesFilesAPI);
  yield takeLatest(FETCH_SOURCE_ARCHIVES, fetchSourceArchivesAPI);
  yield takeLatest(FETCH_GLOBAL_STATS, fetchGlobalStatsAPI);
}
