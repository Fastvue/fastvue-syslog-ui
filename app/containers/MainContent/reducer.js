import { fromJS } from 'immutable';
import { FETCH_SOURCE_STATS_SUCCESS } from './constants';

const initialState = fromJS({
  stats: {}
});

function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOURCE_STATS_SUCCESS:
      return state.set('stats', fromJS(action.stats));

    default:
      return state;
  }
}

export default sideBarReducer;
