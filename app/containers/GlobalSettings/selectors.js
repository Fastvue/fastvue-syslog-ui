import { createSelector } from 'reselect';

const selectGlobalSettings = (state) => state.get('globalSettings');

const makeSelectGlobalSettings = () =>
  createSelector(
    selectGlobalSettings,
    (sideBarState) => sideBarState.get('globalSettings').toJS()
  );

const makeSelectUpdateGlobalSettingsLoading = () =>
  createSelector(
    selectGlobalSettings,
    (sideBarState) => sideBarState.get('updateGlobalSettingsLoading')
  );
export {
  selectGlobalSettings,
  makeSelectGlobalSettings,
  makeSelectUpdateGlobalSettingsLoading
};
