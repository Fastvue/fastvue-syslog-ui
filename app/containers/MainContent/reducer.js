import { fromJS } from 'immutable';
import {
  FETCH_SOURCE_STATS_SUCCESS,
  FETCH_SOURCE_FILES_SUCCESS,
  FETCH_SOURCE_ARCHIVES_SUCCESS
} from './constants';

const initialState = fromJS({
  stats: {},
  files: [],
  archives: []
});

function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOURCE_STATS_SUCCESS:
      return state.set('stats', fromJS(action.stats));
    case FETCH_SOURCE_FILES_SUCCESS:
      return state.set('files', fromJS(action.files));
    case FETCH_SOURCE_ARCHIVES_SUCCESS:
      return state.set('archives', fromJS(action.archives));

    default:
      return state;
  }
}

export default sideBarReducer;
