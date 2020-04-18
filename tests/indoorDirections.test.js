import React from 'react';
import renderer from 'react-test-renderer';
import {IndoorDirections} from '../components/directions/indoorDirections';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';


const mockStore = configureStore([]);
const store = mockStore({
  myState: 'sample text',
});

it('Should cut the string of the building name if it is too long', () => {
  const turnInteriorModeOff = jest.fn();


  // length: 26, maximum allowed is 24
  const stringTooLong26 = '11111111111111111111111111';

  const buildingInfoData={
    name:'some'
  }

  const indoorDirectionsComponent = shallow(<IndoorDirections
    store={store}
    startBuildingNode={buildingInfoData}
    endBuildingNode={buildingInfoData}
    building={stringTooLong26}
    buildingInfoData={buildingInfoData}
    turnInteriorModeOff={turnInteriorModeOff}
  />, { disableLifecycleMethods: true });

  const cutString24 = indoorDirectionsComponent.instance().limitNameLength(stringTooLong26);
  expect(cutString24.length).toBe(24);
});
