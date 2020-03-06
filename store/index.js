import { createStore } from 'redux';

// initial store state
const initialState = {
  language: 'en'
};

// Redux Reducer1, this receives actions that are being DISPATCHED
// remove comment es-lint comment after setting action
// eslint-disable-next-line no-unused-vars
const reducer = (state = initialState, action) => {
  // set action type here example:
  // if (action.type === 'CHANGE_LANGUAGE') {
  //   return {
  //     language: action.payload.language
  //   };
  // }
  return state;
};

const store = createStore(reducer);

export default store;
