import React from 'react';
import renderer from 'react-test-renderer';
import generateBuilding from '../components/indoorPlans/buildingRepository';
import buildings from '../assets/polygons/polygons';
import BuildingWithFloors from '../components/map/building/buildingWithFloors/index';


const building = buildings[0];
const buildingData = building.building; // Hall
const floors = generateBuilding(buildingData);
const defaultFloor = floors[0];

/**
 * test changeFloor() component works as intended
*/
it('Should change to passed value for floor', async () => {
  const buildingComponent = renderer.create(<BuildingWithFloors
    building={building}
    buildingFloorPlans={floors}
    floor={defaultFloor}
  />);

  buildingComponent.getInstance().changeFloor(2);
  expect(buildingComponent.getInstance().state.floor).toBe(floors[1]);
});


it('Should cut the string of the building name if it is too long', () => {
  const buildingComponent = renderer.create(<BuildingWithFloors building={building} buildingFloorPlans={floors} floor={defaultFloor} />);
  // length: 26, maximum allowed is 24
  const stringTooLong26 = '11111111111111111111111111';

  const cutString24 = buildingComponent.getInstance().limitNameLength(stringTooLong26);
  expect(cutString24.length).toBe(24);
});
