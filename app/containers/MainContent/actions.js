import {
  FETCH_SOURCE_STATS,
  FETCH_SOURCE_STATS_SUCCESS,
  FETCH_SOURCE_STATS_FAIL,
  FETCH_SOURCE_FILES,
  FETCH_SOURCE_FILES_SUCCESS,
  FETCH_SOURCE_FILES_FAIL,
  FETCH_SOURCE_ARCHIVES,
  FETCH_SOURCE_ARCHIVES_SUCCESS,
  FETCH_SOURCE_ARCHIVES_FAIL
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

export const fetchSourceFiles = (sourceId) => ({
  type: FETCH_SOURCE_FILES,
  sourceId
});

export const fetchSourceFilesSuccess = (files) => ({
  type: FETCH_SOURCE_FILES_SUCCESS,
  files
});

export const fetchSourceFilesFail = () => ({
  type: FETCH_SOURCE_FILES_FAIL
});

export const fetchSourceArchives = (sourceId) => ({
  type: FETCH_SOURCE_ARCHIVES,
  sourceId
});

export const fetchSourceArchivesSuccess = (archives) => ({
  type: FETCH_SOURCE_ARCHIVES_SUCCESS,
  archives
});

export const fetchSourceArchivesFail = () => ({
  type: FETCH_SOURCE_ARCHIVES_FAIL
});
