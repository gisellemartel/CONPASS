import {
  SET_END_BUILDING_NODE, RESET_NAVIGATION, SET_START_BUILDING_NODE, SET_FROM_WITHIN_BUILDING_NODE, END_FROM_WITHIN_INDOOR_READY, SEND_DIRECTIONS_TO_OUTDOOR, SET_FROM_WITHIN_END_NODE
} from './actionTypes';

export const setFromWithinBuildingNode = (fromWithinBuildingNode) => {
  return { type: SET_FROM_WITHIN_BUILDING_NODE, fromWithinBuildingNode };
};

export const setFromWithinEndNode = (fromWithinEndNode) => {
  return { type: SET_FROM_WITHIN_END_NODE, fromWithinEndNode };
};

export const endFromWithinIndoorReady = () => {
  return { type: END_FROM_WITHIN_INDOOR_READY };
};



export const setStartBuildingNode = (startBuildingNode) => {
  return { type: SET_START_BUILDING_NODE, startBuildingNode };
};

export const setEndBuildingNode = (endBuildingNode) => {
  return { type: SET_END_BUILDING_NODE, endBuildingNode };
};

export const resetNavigation = () => {
  return { type: RESET_NAVIGATION };
};

export const sendDirectionsToOutdoor = (directionsToOutdoor) => {
  return { type: SEND_DIRECTIONS_TO_OUTDOOR, directionsToOutdoor };
};
