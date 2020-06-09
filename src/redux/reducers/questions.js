import {
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  questions: [],
}
function questions(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REQUEST_QUESTIONS:
      console.log('1');
      return { ...state, isFetching: true };
    case RECEIVE_QUESTIONS:
      console.log('2');
      return { ...state, isFetching: false, questions: action.data }
    default:
      console.log('3');
      return state;
  }
}

export default questions;
