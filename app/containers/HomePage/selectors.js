/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectGlobalSettings = () =>
  createSelector(
    selectHome,
    (globalSettingsState) => globalSettingsState.get('globalSettings').toJS()
  );

const makeSelectUpdateGlobalSettingsLoading = () =>
  createSelector(
    selectHome,
    (globalSettingsState) =>
      globalSettingsState.get('updateGlobalSettingsLoading')
  );
export {
  selectHome,
  makeSelectGlobalSettings,
  makeSelectUpdateGlobalSettingsLoading
};
