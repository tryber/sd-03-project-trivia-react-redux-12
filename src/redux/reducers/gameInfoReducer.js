const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  answered: false,
};

const gameInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CORRECT_ANSWER':
      return {
        ...state,
        score: action.score,
        assertions: action.assertions,
        answered: true,
      };
    default:
      return state;
  }
};

export default gameInfoReducer;
