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

const makeSelectSourceFiles = () =>
  createSelector(
    selectMainContent,
    (sideBarState) => sideBarState.get('files').toJS()
  );

const makeSelectSourceArchives = () =>
  createSelector(
    selectMainContent,
    (sideBarState) => sideBarState.get('archives').toJS()
  );

export {
  selectMainContent,
  makeSelectSourceStats,
  makeSelectSourceFiles,
  makeSelectSourceArchives
};
