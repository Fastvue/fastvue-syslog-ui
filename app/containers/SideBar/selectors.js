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

export { selectSideBar, makeSelectIsAutoDiscoverOn, makeSelectSourceList };
