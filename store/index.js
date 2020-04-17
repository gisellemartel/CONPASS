import { createStore } from 'redux';
import {
  SET_END_BUILDING_NODE, RESET_NAVIGATION, SET_START_BUILDING_NODE, SET_FROM_WITHIN_BUILDING_NODE, END_FROM_WITHIN_INDOOR_READY, SEND_DIRECTIONS_TO_OUTDOOR, SET_FROM_WITHIN_END_NODE
} from './actionTypes';

// initial store state
const initialState = {
  endBuildingNode: '',
  startBuildingNode: '',
  // fromWithinBuildingNode: '',
  // navType: '',
  // startFromWithinIndoorReady: false,
  // endFromWithinIndoorReady: false,
  directionsToOutdoor: '',
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_END_BUILDING_NODE) {
    console.log(SET_END_BUILDING_NODE);
    return {
      ...state,
      endBuildingNode: action.endBuildingNode,
    };
  }

  if (action.type === SET_START_BUILDING_NODE) {
    console.log(SET_START_BUILDING_NODE);
    return {
      ...state,
      startBuildingNode: action.startBuildingNode,
    };
  }

  // if (action.type === SET_FROM_WITHIN_BUILDING_NODE) {
  //   console.log(SET_FROM_WITHIN_BUILDING_NODE);
  //   return {
  //     ...state,
  //     fromWithinBuildingNode: action.fromWithinBuildingNode,
  //   };
  // }

  // if (action.type === SET_FROM_WITHIN_END_NODE) {
  //   console.log(SET_FROM_WITHIN_END_NODE);
  //   return {
  //     ...state,
  //     endBuildingNode: action.fromWithinEndNode,
  //   };
  // }

  if (action.type === SEND_DIRECTIONS_TO_OUTDOOR) {
    console.log(SEND_DIRECTIONS_TO_OUTDOOR);
    return {
      ...state,
      directionsToOutdoor: action.directionsToOutdoor
    };
  }

  if (action.type === RESET_NAVIGATION) {
    console.log(RESET_NAVIGATION);
    return {
      ...state,
      endBuildingNode: '',
      startBuildingNode: '',
      // fromWithinBuildingNode: '',
      // startFromWithinIndoorReady: false,
      // endFromWithinIndoorReady: false,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
