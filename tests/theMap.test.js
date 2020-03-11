import React from 'react';
import renderer from 'react-test-renderer';
import TheMap from '../components/map/index';

// FAILING TEST related to the MapView Render method
it('Should render the map with the props of the parent', async () => {
  const region = {
    latitude: 45.492409,
    longitude: -73.582153,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const theMapComponent = renderer.create(<TheMap updatedRegion={region} />);
  console.log(theMapComponent);
  expect(theMapComponent.state.region).toBe(region);
});
