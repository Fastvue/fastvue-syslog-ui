import 'whatwg-fetch';

import { logout } from 'containers/App/actions';
import store from './../store';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default async function request(options) {
  let res = await fetch(process.env.API_URL + options.url, {
    ...options,
    body: JSON.stringify(options.data),
    headers: {
      ...options.headers
    },
    ...(!options.url.includes('login') && {
      withCredentials: true,
      credentials: 'include'
    })
  });
  res = checkStatus(res);
  res = await res.text();
  if (res === 'undefined') {
    store.dispatch(logout());
    throw new Error('undefined');
  }
  return res ? JSON.parse(res) : {};
}
