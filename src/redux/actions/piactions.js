export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (email, hash) => ({
  type: SET_EMAIL,
  payload: {
    email,
    hash,
  }
});

export const setName = (name) =>({
  type: SET_NAME,
  payload: name,
})