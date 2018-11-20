/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

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

const makeSelectToBeDeletedSource = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('toBeDeletedSource')
  );

const makeSelectAddOrUpdateSourceLoading = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('addOrUpdateSourceLoading')
  );

const makeSelectIsAddSourceSuccessModalOpen = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('isAddSourceSuccessModalOpen')
  );

const makeSelectActiveSource = () =>
  createSelector(
    selectSideBar,
    (sideBarState) => sideBarState.get('activeSource').toJS()
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
  makeSelectIsDeleteSourceSuccessModalOpen,
  makeSelectToBeDeletedSource,
  makeSelectAddOrUpdateSourceLoading,
  makeSelectIsAddSourceSuccessModalOpen,
  makeSelectActiveSource
};
