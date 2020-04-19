import {
  setStartBuildingNode, setEndBuildingNode, resetNavigation, sendDirectionsToOutdoor
} from '../store/actions';
import {
  SEND_DIRECTIONS_TO_OUTDOOR, RESET_NAVIGATION,
  SET_END_BUILDING_NODE, SET_START_BUILDING_NODE
} from '../store/actionTypes';


describe('Redux actions', () => {
  it('Should return setStartBuildingNode', () => {
    const startBuildingNode = 'node';
    const resultMock = { type: SET_START_BUILDING_NODE, startBuildingNode };
    const result = setStartBuildingNode(startBuildingNode);
    expect(result).toEqual(resultMock);
  });

  it('Should return setEndStartBuildingNode', () => {
    const endBuildingNode = 'node';
    const resultMock = { type: SET_END_BUILDING_NODE, endBuildingNode };
    const result = setEndBuildingNode(endBuildingNode);
    expect(result).toEqual(resultMock);
  });

  it('Should resetNavigation', () => {
    const resultMock = { type: RESET_NAVIGATION };
    const result = resetNavigation();
    expect(result).toEqual(resultMock);
  });

  it('Should return directionsToOutdoor', () => {
    const directionsToOutdoor = 'directions';
    const resultMock = { type: SEND_DIRECTIONS_TO_OUTDOOR, directionsToOutdoor };
    const result = sendDirectionsToOutdoor(directionsToOutdoor);
    expect(result).toEqual(resultMock);
  });
});
