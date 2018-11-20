import {
  FETCH_SOURCE_STATS,
  FETCH_SOURCE_STATS_SUCCESS,
  FETCH_SOURCE_STATS_FAIL
} from './constants';

export const fetchSourceStats = (sourceId) => ({
  type: FETCH_SOURCE_STATS,
  sourceId
});

export const fetchSourceStatsSuccess = (stats) => ({
  type: FETCH_SOURCE_STATS_SUCCESS,
  stats
});

export const fetchSourceStatsFail = () => ({
  type: FETCH_SOURCE_STATS_FAIL
});
