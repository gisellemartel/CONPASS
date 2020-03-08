import { createStore } from 'redux';

// initial store state
const initialState = {
  language: 'en'
};

// Redux Reducer1, this receives actions that are being DISPATCHED
// Remove eslint comment below when adding action to the reducer.
// eslint-disable-next-line no-unused-vars
const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

export default store;
