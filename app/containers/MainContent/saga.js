import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
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
  const requestURL = `${process.env.API_URL}/api/sources/stats`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      id: action.sourceId
    })
  };

  try {
    const stats = yield call(request, requestURL, requestOptions);

    yield put(fetchSourceStatsSuccess(stats));
  } catch (err) {
    yield put(fetchSourceStatsFail(err));
  }
}

export function* fetchGlobalStatsAPI() {
  const requestURL = `${process.env.API_URL}/api/sources/globalstats`;

  try {
    const globalStats = yield call(request, requestURL);
    yield put(fetchGlobalStatsSuccess(globalStats));
  } catch (err) {
    yield put(fetchGlobalStatsFail(err));
  }
}

export function* fetchSourcesFilesAPI(action) {
  const requestURL = `${process.env.API_URL}/api/sources/filelist`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      id: action.sourceId
    })
  };

  try {
    const files = yield call(request, requestURL, requestOptions);

    yield put(fetchSourceFilesSuccess(files));
  } catch (err) {
    yield put(fetchSourceFilesFail(err));
  }
}

export function* fetchSourceArchivesAPI(action) {
  const requestURL = `${process.env.API_URL}/api/sources/archivelist`;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      id: action.sourceId
    })
  };

  try {
    const archives = yield call(request, requestURL, requestOptions);

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
