import { combineReducers } from 'redux';
import questions from '../reducers/questions';
import PIreducer from '../reducers/personalinfo';
import gameInfoReducer from '../reducers/gameInfoReducer';

const rootReducer = combineReducers({ PIreducer, questions, gameInfoReducer });

export default rootReducer;
