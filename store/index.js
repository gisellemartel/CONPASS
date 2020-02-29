import { createStore } from 'redux';

const initialState = {
  language: 'en'
};

const reducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_LANGUAGE') {
    return {
      language: action.payload.language
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
