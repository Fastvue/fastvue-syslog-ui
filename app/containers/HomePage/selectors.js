/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectGlobalSettings = () =>
  createSelector(
    selectHome,
    (sideBarState) => sideBarState.get('globalSettings').toJS()
  );
export { selectHome, makeSelectGlobalSettings };
