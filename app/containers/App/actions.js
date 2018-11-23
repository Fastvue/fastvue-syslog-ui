import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

export const login = (credentials) => ({
  type: LOGIN,
  credentials
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFail = () => ({
  type: LOGIN_FAIL
});
