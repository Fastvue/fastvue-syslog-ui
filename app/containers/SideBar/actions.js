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
  ADD_OR_UPDATE_SOURCE,
  ADD_OR_UPDATE_SOURCE_SUCCESS,
  ADD_OR_UPDATE_SOURCE_FAIL
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
