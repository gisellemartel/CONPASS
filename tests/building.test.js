import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/home/index';
import Building from '../components/map/building/index';
import generateBuilding from '../assets/svgReactNative/buildingRepository';
import buildings from '../assets/polygons/polygons';


/**
 * test Building component renders
 */
it('Should render the building with the props of the parent', async () => {
  const building = buildings[0];
  const buildingData = building.building;
  const floors = generateBuilding(buildingData);

  // parent component
  const homeComponent = renderer.create(<Home />);

  const interiorModeOff = () => {
    homeComponent.setState({
      interiorMode: false,
      building: null
    });
  };

  const buildingComponent = renderer.create(<Building
    building={building}
    buildingFloorPlans={floors}
    interiorModeOff={interiorModeOff}
  />);

  console.log(buildingComponent);

  expect(buildingComponent.state.floor).toBe(floors[0]);
});

/**
 * test changeFloor() component works as intended
 */
it('Should change to passed value for floor', async () => {
  const building = buildings[0];
  const buildingData = building.building;
  const floors = generateBuilding(buildingData);
  const defaultFloor = floors[0];


  // parent component
  const homeComponent = renderer.create(<Home />);

  const interiorModeOff = () => {
    homeComponent.setState({
      interiorMode: false,
      building: null
    });
  };

  const buildingComponent = renderer.create(<Building
    building={building}
    buildingFloorPlans={floors}
    interiorModeOff={interiorModeOff}
  />);


  const changeToFloor = generateBuilding(buildingData)[1];
  building.changeFloor(changeToFloor);

  expect(buildingComponent.state.floor).toBe(floors[1]);
});
