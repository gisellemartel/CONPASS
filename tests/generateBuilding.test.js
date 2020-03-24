import generateBuilding from '../assets/svgReactNative/buildingRepository';

/**
 * test generateBuilding function
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
