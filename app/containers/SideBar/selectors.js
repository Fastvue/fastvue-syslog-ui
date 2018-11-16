/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectSideBar = (state) => state.get('sidebar');
const makeSelectIsAutoDiscoverOn = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isAutoDiscoverOn')
  );

const makeSelectSourceList = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('sourceList').toJS()
  );

const makeSelectIsAddSysLogSourceOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isAddSysLogSourceOpen')
  );

const makeSelectIsListeningPortModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isListeningPortModalOpen')
  );

const makeSelectSourceIdWhoseSourceEditorIsOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('sourceIdWhoseSourceEditorIsOpen')
  );

const makeSelectIsDeleteSourceModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isDeleteSourceModalOpen')
  );

const makeSelectListeningPorts = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('listeningPorts')
  );

const makeSelectIsListeningPortSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isListeningPortSuccessModalOpen')
  );

const makeSelectIsDeleteSourceSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isDeleteSourceSuccessModalOpen')
  );

export {
  selectSideBar,
  makeSelectIsAutoDiscoverOn,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen,
  makeSelectSourceIdWhoseSourceEditorIsOpen,
  makeSelectIsDeleteSourceModalOpen,
  makeSelectListeningPorts,
  makeSelectIsListeningPortSuccessModalOpen,
  makeSelectIsDeleteSourceSuccessModalOpen
};
