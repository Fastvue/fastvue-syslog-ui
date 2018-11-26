import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('app');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    (routeState) => routeState.get('location').toJS()
  );

const makeSelectIsLoggingIn = () =>
  createSelector(
    selectGlobal,
    (routeState) => routeState.get('isLoggingIn')
  );

const makeSelectIsLoggedIn = () =>
  createSelector(
    selectGlobal,
    (routeState) => routeState.get('isLoggedIn')
  );

const makeSelectInitConfig = () =>
  createSelector(
    selectGlobal,
    (routeState) => routeState.get('initConfig')
  );

const makeSelectAppVersion = () =>
  createSelector(
    selectGlobal,
    (routeState) => routeState.get('appVersion')
  );

const makeSelectIsLoggedOut = () =>
  createSelector(
    selectGlobal,
    (routeState) => routeState.get('isLoggedOut')
  );

const makeSelectGlobalSettings = () =>
  createSelector(
    selectGlobal,
    (globalSettingsState) => globalSettingsState.get('globalSettings').toJS()
  );

const makeSelectUpdateGlobalSettingsLoading = () =>
  createSelector(
    selectGlobal,
    (globalSettingsState) =>
      globalSettingsState.get('updateGlobalSettingsLoading')
  );

const makeSelectListeningPorts = () =>
  createSelector(
    selectGlobal,
    (sideBarState) => sideBarState.get('listeningPorts')
  );

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectIsLoggingIn,
  makeSelectIsLoggedIn,
  makeSelectInitConfig,
  makeSelectAppVersion,
  makeSelectIsLoggedOut,
  makeSelectGlobalSettings,
  makeSelectUpdateGlobalSettingsLoading,
  makeSelectListeningPorts
};
