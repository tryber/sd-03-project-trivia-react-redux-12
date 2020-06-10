import { combineReducers } from 'redux';
import questions from '../reducers/questions';
import PIreducer from '../reducers/personalinfo';

const rootReducer = combineReducers({ PIreducer, questions });

export default rootReducer;
