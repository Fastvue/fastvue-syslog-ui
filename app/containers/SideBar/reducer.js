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
  CLOSE_LISTENING_PORT_MODAL,
  OPEN_DELETE_SOURCE_MODAL,
  CLOSE_DELETE_SOURCE_MODAL,
  SET_PORTS,
  TOGGLE_DELETE_SOURCE_SUCCESS_MODAL,
  TOGGLE_LISTENING_PORT_SUCCESS_MODAL,
  UPDATE_TO_BE_DELETED_SOURCE,
  ADD_OR_UPDATE_SOURCE,
  ADD_OR_UPDATE_SOURCE_FAIL,
  ADD_OR_UPDATE_SOURCE_SUCCESS,
  TOGGLE_ADD_SOURCE_SUCCESS_MODAL,
  UPDATE_ACTIVE_SOURCE
} from './constants';

const initialState = fromJS({
  isAutoDiscoverOn: false,
  isAddSysLogSourceOpen: false,
  isListeningPortModalOpen: false,
  isListeningPortSuccessModalOpen: false,
  isAddSourceSuccessModalOpen: false,
  isDeleteSourceModalOpen: false,
  isDeleteSourceSuccessModalOpen: false,
  sourceIdWhoseSourceEditorIsOpen: null,
  addOrUpdateSourceLoading: false,
  activeSource: fromJS({}),
  toBeDeletedSource: {
    id: null,
    displayName: ''
  },
  listeningPorts: '514',
  sourceList: []
});

function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTO_DISCOVER:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));

    case TOGGLE_SOURCE_AUTO_DISCOVER:
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

    case TOGGLE_DELETE_SOURCE_SUCCESS_MODAL:
      return state.set(
        'isDeleteSourceSuccessModalOpen',
        !state.get('isDeleteSourceSuccessModalOpen')
      );
    case TOGGLE_ADD_SOURCE_SUCCESS_MODAL:
      return state.set(
        'isAddSourceSuccessModalOpen',
        !state.get('isAddSourceSuccessModalOpen')
      );
    case TOGGLE_LISTENING_PORT_SUCCESS_MODAL:
      return state.set(
        'isListeningPortSuccessModalOpen',
        !state.get('isListeningPortSuccessModalOpen')
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
    case OPEN_DELETE_SOURCE_MODAL:
      return state.set('isDeleteSourceModalOpen', true);

    case CLOSE_DELETE_SOURCE_MODAL:
      return state.set('isDeleteSourceModalOpen', false);
    case FETCH_SOURCE_LIST_SUCCESS:
      return state.set('sourceList', fromJS(action.sourceList));
    case FETCH_SOURCE_LIST_FAIL:
      return state.set('isAutoDiscoverOn', !state.get('isAutoDiscoverOn'));
    case UPDATE_TO_BE_DELETED_SOURCE:
      return state.set('toBeDeletedSource', {
        id: action.sourceId,
        displayName: action.displayName
      });

    case UPDATE_ACTIVE_SOURCE:
      return state.set('activeSource', fromJS(action.source));
    case SET_PORTS:
      return state.set('ports', action.ports);

    case ADD_OR_UPDATE_SOURCE:
      return state
        .set('addOrUpdateSourceLoading', true)
        .set('addOrUpdateSourceErr', false);
    case ADD_OR_UPDATE_SOURCE_SUCCESS:
      return state
        .set('addOrUpdateSourceLoading', false)
        .set('addOrUpdateSourceErr', false);
    case ADD_OR_UPDATE_SOURCE_FAIL:
      return state
        .set('addOrUpdateSourceLoading', false)
        .set('addOrUpdateSourceErr', action.err);
    default:
      return state;
  }
}

export default sideBarReducer;
