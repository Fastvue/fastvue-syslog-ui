import {
  TOGGLE_AUTO_DISCOVER_BUTTON,
  TOGGLE_SOURCE_AUTO_DISCOVER_BUTTON,
  FETCH_SOURCE_LIST,
  FETCH_SOURCE_LIST_SUCCESS,
  FETCH_SOURCE_LIST_FAIL,
  OPEN_SYSLOG_SOURCE_ADD_FORM,
  CLOSE_SYSLOG_SOURCE_ADD_FORM,
  OPEN_LISTENING_PORT_MODAL,
  CLOSE_LISTENING_PORT_MODAL
} from './constants';

export const toggleAutoDiscoverButton = () => ({
  type: TOGGLE_AUTO_DISCOVER_BUTTON
});

export const toggleSourceAutoDiscoverButton = (sourceId) => ({
  type: TOGGLE_SOURCE_AUTO_DISCOVER_BUTTON,
  sourceId
});

export const openSyslogSourceAddForm = () => ({
  type: OPEN_SYSLOG_SOURCE_ADD_FORM
});

export const closeSyslogSourceAddForm = () => ({
  type: CLOSE_SYSLOG_SOURCE_ADD_FORM
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
