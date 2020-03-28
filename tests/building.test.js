import React from 'react';
import renderer from 'react-test-renderer';
import Building from '../components/map/building/index';
import generateBuilding from '../components/indoorPlans/buildingRepository';
import buildings from '../assets/polygons/polygons';

it('Should render buildingWithFloor if floor data exists', async () => {
  const building = buildings[0];
  const buildingData = building.building;
  const floors = generateBuilding(buildingData);

  const interiorModeOff = jest.fn();

  const buildingComponent = renderer.create(<Building
    building={building}
    buildingFloorPlans={floors}
    interiorModeOff={interiorModeOff}
  />);

  expect(buildingComponent.getInstance().state.floor).toBe(floors[0]);
});

it('Should render buildingNoFloors if floor data  not available', async () => {
  const buildingName = 'A building without floor data';
  const floors = generateBuilding(buildingName);

  const interiorModeOff = jest.fn();

  const buildingComponent = renderer.create(<Building
    buildingFloorPlans={floors}
    interiorModeOff={interiorModeOff}
  />);

  expect(buildingComponent.getInstance().state.floor).toBe(undefined);
});
