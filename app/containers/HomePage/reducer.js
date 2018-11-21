import { fromJS } from 'immutable';
import { FETCH_GLOBAL_SETTINGS_SUCCESS } from './constants';

// The initial state of the App
const initialState = fromJS({
  globalSettings: {}
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GLOBAL_SETTINGS_SUCCESS:
      return state.set('globalSettings', fromJS(action.globalSettings));
    default:
      return state;
  }
}

export default homeReducer;
