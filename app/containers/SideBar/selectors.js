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
export {
  selectSideBar,
  makeSelectIsAutoDiscoverOn,
  makeSelectSourceList,
  makeSelectIsAddSysLogSourceOpen,
  makeSelectIsListeningPortModalOpen
};
