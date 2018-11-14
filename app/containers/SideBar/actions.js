import {
  TOGGLE_AUTO_DISCOVER_BUTTON,
  FETCH_SOURCE_LIST,
  FETCH_SOURCE_LIST_SUCCESS,
  FETCH_SOURCE_LIST_FAIL
} from './constants';

export const toggleAutoDiscoverButton = () => ({
  type: TOGGLE_AUTO_DISCOVER_BUTTON
});

export const fetchSourceList = () => ({
  type: FETCH_SOURCE_LIST
});

export const fetchSourceListSuccess = (sourceList) => ({
  type: FETCH_SOURCE_LIST_SUCCESS,
  sourceList
});

export const fetchSourceListFail = (err) => ({
  type: FETCH_SOURCE_LIST_FAIL,
  err
});
