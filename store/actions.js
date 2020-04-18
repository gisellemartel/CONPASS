import {
  ACCESSIBILITY_ON, ACCESSIBILITY_OFF, SET_END_BUILDING_NODE, RESET_NAVIGATION, SET_START_BUILDING_NODE, SEND_DIRECTIONS_TO_OUTDOOR
} from './actionTypes';

export const accessibilityOn = () => {
  return { type: ACCESSIBILITY_ON };
};

export const accessibilityOff = () => {
  return { type: ACCESSIBILITY_OFF };
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
