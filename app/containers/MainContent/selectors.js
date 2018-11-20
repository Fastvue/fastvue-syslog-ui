/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMainContent = (state) => state.get('maincontent');
const makeSelectSourceStats = () =>
  createSelector(
    selectMainContent,
    (sideBarState) => sideBarState.get('stats').toJS()
  );

export { selectMainContent, makeSelectSourceStats };
