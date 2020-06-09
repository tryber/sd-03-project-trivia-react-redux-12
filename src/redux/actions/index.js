export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const receiveQuestions = (data) => ({
  type: RECEIVE_QUESTIONS,
  data,
});
