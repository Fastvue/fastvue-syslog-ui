import { fromJS } from 'immutable';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

const initialState = fromJS({
  isLoggedIn: false,
  isLoggingIn: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('isLoggingIn', true);
    case LOGIN_SUCCESS:
      return state.set('isLoggingIn', false).set('isLoggedIn', true);
    case LOGIN_FAIL:
      return state.set('isLoggingIn', false).set('isLoggedIn', false);
    default:
      return state;
  }
}

export default appReducer;
