import { SET_END_BUILDING_NODE, RESET_NAVIGATION, SET_START_BUILDING_NODE } from './actionTypes';

export const setEndBuildingNode = (endBuildingNode) => {
  return { type: SET_END_BUILDING_NODE, endBuildingNode };
};

export const setStartBuildingNode = (startBuildingNode) => {
  return { type: SET_START_BUILDING_NODE, startBuildingNode };
};

export const resetNavigation = () => {
  return { type: RESET_NAVIGATION };
};
