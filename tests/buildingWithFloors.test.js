/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import generateFloorPlan from '../components/buildings/floorPlans/floorPlanRepository';
import buildings from '../assets/polygons/polygons';
import BuildingWithFloors from '../components/buildings/buildingView/buildingWithFloors/index';


const building = buildings[0];
const buildingData = building.building; // Hall
const floors = generateFloorPlan(buildingData);
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
