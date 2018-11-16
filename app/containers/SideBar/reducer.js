import { fromJS } from 'immutable';
import {
  TOGGLE_AUTO_DISCOVER,
  TOGGLE_SOURCE_AUTO_DISCOVER,
  TOGGLE_SOURCE_AUTO_DISCOVER_SUCCESS,
  TOGGLE_SOURCE_AUTO_DISCOVER_FAIL,
  FETCH_SOURCE_LIST,
  FETCH_SOURCE_LIST_SUCCESS,
  FETCH_SOURCE_LIST_FAIL,
  OPEN_SYSLOG_SOURCE_ADD_FORM,
  CLOSE_SYSLOG_SOURCE_ADD_FORM,
  OPEN_SOURCE_EDITOR,
  CLOSE_SOURCE_EDITOR,
  OPEN_LISTENING_PORT_MODAL,
  CLOSE_LISTENING_PORT_MODAL
} from './constants';

const initialState = fromJS({
  isAutoDiscoverOn: false,
  isAddSysLogSourceOpen: false,
  isListeningPortModalOpen: false,
  sourceIdWhoseSourceEditorIsOpen: null,
  sourceList: []
});

function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTO_DISCOVER:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));

    case TOGGLE_SOURCE_AUTO_DISCOVER:
      console.log(action);
      return state.setIn(
        [
          'sourceList',
          state
            .get('sourceList')
            .toJS()
            .findIndex((obj) => obj.id === action.sourceId),
          'enabled'
        ],
        !action.isSourceEnabled
      );

    case TOGGLE_SOURCE_AUTO_DISCOVER_SUCCESS:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));

    case TOGGLE_SOURCE_AUTO_DISCOVER_FAIL:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));

    case OPEN_SYSLOG_SOURCE_ADD_FORM:
      return state.set('isAddSysLogSourceOpen', true);

    case CLOSE_SYSLOG_SOURCE_ADD_FORM:
      return state.set('isAddSysLogSourceOpen', false);

    case OPEN_SOURCE_EDITOR:
      return state.set('sourceIdWhoseSourceEditorIsOpen', action.sourceId);

    case CLOSE_SOURCE_EDITOR:
      return state.set('sourceIdWhoseSourceEditorIsOpen', null);
    case OPEN_LISTENING_PORT_MODAL:
      return state.set('isListeningPortModalOpen', true);

    case CLOSE_LISTENING_PORT_MODAL:
      return state.set('isListeningPortModalOpen', false);
    case FETCH_SOURCE_LIST:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    case FETCH_SOURCE_LIST_SUCCESS:
      return state.set('sourceList', fromJS(action.sourceList));
    case FETCH_SOURCE_LIST_FAIL:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    default:
      return state;
  }
}

export default sideBarReducer;
