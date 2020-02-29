import { createStore } from 'redux';

// initial store state
const initialState = {
  language: 'en'
};

// Redux Reducer, this receives actions that are being DISPATCHED
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
