import {
  requestQuestions,
  receiveQuestions,
 } from '../redux/actions/index';

export const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

// export function fetchToken() {
//   return (dispatch) => {
//     dispatch(requestToken());
//     return fetch(URL_TOKEN)
//       .then((response) => response.json())
//       .then((data) => dispatch(receiveQuestions(data)));
//   };
// }

export const fetchToken = () => fetch(URL_TOKEN)
  .then((response) => response.json()
  .then(function (json) {
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }));

export function triviaAPI(token) {
  return (dispatch) => {
    dispatch(requestQuestions());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => dispatch(receiveQuestions(data.results)));
  };
}
