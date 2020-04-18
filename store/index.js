import { createStore } from 'redux';
import {
  SET_END_BUILDING_NODE, RESET_NAVIGATION, SET_START_BUILDING_NODE, SEND_DIRECTIONS_TO_OUTDOOR
} from './actionTypes';

// initial store state
const initialState = {
  endBuildingNode: '',
  startBuildingNode: '',
  directionsToOutdoor: '',
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_END_BUILDING_NODE) {
    return {
      ...state,
      endBuildingNode: action.endBuildingNode,
    };
  }

  if (action.type === SET_START_BUILDING_NODE) {
    return {
      ...state,
      startBuildingNode: action.startBuildingNode,
    };
  }

  if (action.type === SEND_DIRECTIONS_TO_OUTDOOR) {
    return {
      ...state,
      directionsToOutdoor: action.directionsToOutdoor
    };
  }

  if (action.type === RESET_NAVIGATION) {
    return {
      ...state,
      endBuildingNode: '',
      startBuildingNode: '',
      directionsToOutdoor: '',
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
