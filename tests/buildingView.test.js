import React from 'react';
import renderer from 'react-test-renderer';
import BuildingView from '../components/buildings/buildingView/index';
import generateFloorPlan from '../components/buildings/floorPlans/floorPlanRepository';
import generateGraph from '../indoor_directions_modules/graphRepository';
import buildings from '../assets/polygons/polygons';


it('Should render buildingWithFloor if floor data exists', async () => {
  const building = buildings[0];
  const buildingData = building.building;
  const floors = generateFloorPlan(buildingData);
  const adjacencyGraph = generateGraph(buildingData);

  const turnInteriorModeOff = jest.fn();

  const buildingViewComponent = renderer.create(<BuildingView
    building={building}
    buildingFloorPlans={floors}
    adjacencyGraphs={adjacencyGraph}
    turnInteriorModeOff={turnInteriorModeOff}
  />);

  expect(buildingViewComponent.getInstance().state.floorPlan).toBe(floors[0]);
});

it('Should render buildingNoFloors if floor data  not available', async () => {
  const building = buildings[0];
  const buildingName = 'A building without floor data';
  const floors = generateFloorPlan(buildingName);
  const adjacencyGraph = generateGraph(buildingName);

  const turnInteriorModeOff = jest.fn();

  const buildingViewComponent = renderer.create(<BuildingView
    building={building}
    buildingFloorPlans={floors}
    adjacencyGraphs={adjacencyGraph}
    turnInteriorModeOff={turnInteriorModeOff}
  />);

  expect(buildingViewComponent.getInstance().state.floor).toBe(undefined);
});
