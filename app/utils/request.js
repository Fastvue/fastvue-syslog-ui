import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.text().then((text) => {
    console.log(text === undefined);
    if (text === 'undefined') {
      return undefined;
    }
    return text ? JSON.parse(text) : {};
  });
  // console.log(response.json());
  // try {
  //   response.json();
  // } catch (err) {
  //   console.log('undefined');
  // }\
  // let val;
  // try {
  //   val = response.json();
  // } catch (err) {
  //   console.log(err, 'Error');
  // }

  // console.log(val, 'dsfkdsfjdsl');
  // console.log('dsfdsfdsf', response, response.body);
  // JSON.parse(JSON.stringify(response.json().body));
  // // response.json().then((val) => console.log(val));
  // if (response.status === 204 || response.status === 205) {
  //   return null;
  // }
  // // let jsonResponse;

  // return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  // if (response.data ==='undefined') {
  //   console.log('undefined');
  //   return 'undefined';
  // }
  if (response.status >= 200 && response.status < 300) {
    // return JSON.parse(JSON.stringify(response.data));
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options) {
  return fetch(process.env.API_URL + options.url, {
    ...options,
    body: JSON.stringify(options.data),
    ...(!options.url.includes('login') && {
      withCredentials: true,
      credentials: 'include'
    })
  })
    .then(checkStatus)
    .then(parseJSON);
}

// export default function request(options) {
//   return axios({
//     ...options,
//     ...(!options.url.includes('login') && {
//       withCredentials: true,
//       credentials: 'include'
//     })
//   }).then(checkStatus);
// }
