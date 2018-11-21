/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMainContent = (state) => state.get('maincontent');
const makeSelectSourceStats = () =>
  createSelector(
    selectMainContent,
    (mainContentState) => mainContentState.get('stats').toJS()
  );

const makeSelectSourceFiles = () =>
  createSelector(
    selectMainContent,
    (mainContentState) => mainContentState.get('files').toJS()
  );

const makeSelectSourceArchives = () =>
  createSelector(
    selectMainContent,
    (mainContentState) => mainContentState.get('archives').toJS()
  );

export {
  selectMainContent,
  makeSelectSourceStats,
  makeSelectSourceFiles,
  makeSelectSourceArchives
};
