/**
 * The global state selectors
 */

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

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectIsLoggingIn,
  makeSelectIsLoggedIn
};
