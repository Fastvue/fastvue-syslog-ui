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

const makeSelectAppVersion = () =>
  createSelector(
    selectHome,
    (globalSettingsState) => globalSettingsState.get('appVersion')
  );
export {
  selectHome,
  makeSelectGlobalSettings,
  makeSelectAppVersion,
  makeSelectUpdateGlobalSettingsLoading
};
