import { fromJS } from 'immutable';
import {
  FETCH_GLOBAL_SETTINGS_SUCCESS,
  UPDATE_GLOBAL_SETTINGS,
  UPDATE_GLOBAL_SETTINGS_FAIL,
  UPDATE_GLOBAL_SETTINGS_SUCCESS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  globalSettings: {},
  updateGlobalSettingsLoading: false
});

function globalSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GLOBAL_SETTINGS_SUCCESS:
      return state.set('globalSettings', fromJS(action.globalSettings));
    case UPDATE_GLOBAL_SETTINGS:
      return state.set('updateGlobalSettingsLoading', true);
    case UPDATE_GLOBAL_SETTINGS_SUCCESS:
      return state.set('updateGlobalSettingsLoading', false);
    case UPDATE_GLOBAL_SETTINGS_FAIL:
      return state.set('updateGlobalSettingsLoading', false);
    default:
      return state;
  }
}

export default globalSettingsReducer;
