import { SET_NAME, SET_EMAIL } from '../actions/piactions';

const initialState = {
  name: '',
  email: '',
  hash:'',
}

function PersonalInfoReducer (state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        hash: action.payload.hash,
      }
    default:
      return state
  }
}

export default PersonalInfoReducer;