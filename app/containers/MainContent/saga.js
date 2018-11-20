import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_SOURCE_STATS } from './constants';
import { fetchSourceStatsSuccess, fetchSourceStatsFail } from './actions';

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
    console.log(stats);
    yield put(fetchSourceStatsSuccess(stats));
  } catch (err) {
    yield put(fetchSourceStatsFail(err));
  }
}

export default function* mainContentSaga() {
  yield takeLatest(FETCH_SOURCE_STATS, fetchSourcesStatsAPI);
}
