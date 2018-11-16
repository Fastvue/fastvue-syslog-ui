import {
  TOGGLE_AUTO_DISCOVER,
  TOGGLE_SOURCE_AUTO_DISCOVER,
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
  ADD_OR_UPDATE_SOURCE,
  ADD_OR_UPDATE_SOURCE_SUCCESS,
  ADD_OR_UPDATE_SOURCE_FAIL,
  DELETE_SOURCE,
  DELETE_SOURCE_SUCCESS,
  DELETE_SOURCE_FAIL,
  SET_PORTS,
  SET_PORTS_SUCCESS,
  SET_PORTS_FAIL,
  UPDATE_TO_BE_DELETED_SOURCE,
  TOGGLE_DELETE_SOURCE_SUCCESS_MODAL,
  TOGGLE_LISTENING_PORT_SUCCESS_MODAL
} from './constants';

export const toggleAutoDiscover = () => ({
  type: TOGGLE_AUTO_DISCOVER
});

export const toggleSourceAutoDiscover = (sourceId, isSourceEnabled) => ({
  type: TOGGLE_SOURCE_AUTO_DISCOVER,
  sourceId,
  isSourceEnabled
});

export const openSyslogSourceAddForm = () => ({
  type: OPEN_SYSLOG_SOURCE_ADD_FORM
});

export const closeSyslogSourceAddForm = () => ({
  type: CLOSE_SYSLOG_SOURCE_ADD_FORM
});

export const openSourceEditor = (sourceId) => ({
  type: OPEN_SOURCE_EDITOR,
  sourceId
});

export const closeSourceEditor = () => ({
  type: CLOSE_SOURCE_EDITOR
});

export const openListeningPortModal = () => ({
  type: OPEN_LISTENING_PORT_MODAL
});

export const closeListeningPortModal = () => ({
  type: CLOSE_LISTENING_PORT_MODAL
});

export const openDeleteSourceModal = () => ({
  type: OPEN_DELETE_SOURCE_MODAL
});

export const closeDeleteSourceModal = () => ({
  type: CLOSE_DELETE_SOURCE_MODAL
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

export const addOrUpdateSource = (fields, id) => ({
  type: ADD_OR_UPDATE_SOURCE,
  fields,
  id
});

export const addOrUpdateSourceSuccess = () => ({
  type: ADD_OR_UPDATE_SOURCE_SUCCESS
});

export const addOrUpdateSourceFail = (err) => ({
  type: ADD_OR_UPDATE_SOURCE_FAIL,
  err
});

export const deleteSource = (sourceId) => ({
  type: DELETE_SOURCE,
  sourceId
});

export const deleteSourceSuccess = () => ({
  type: DELETE_SOURCE_SUCCESS
});

export const deleteSourceFail = (err) => ({
  type: DELETE_SOURCE_FAIL,
  err
});

export const setPorts = (ports) => ({
  type: SET_PORTS,
  ports
});

export const setPortsSuccess = () => ({
  type: SET_PORTS_SUCCESS
});

export const setPortsFail = (err) => ({
  type: SET_PORTS_FAIL,
  err
});

export const updateToBeDeletedSource = (sourceId, displayName) => ({
  type: UPDATE_TO_BE_DELETED_SOURCE,
  sourceId,
  displayName
});

export const toggleDeleteSourceSuccessModal = () => ({
  type: TOGGLE_DELETE_SOURCE_SUCCESS_MODAL
});

export const toggleListeningPortSuccessModal = () => ({
  type: TOGGLE_LISTENING_PORT_SUCCESS_MODAL
});
