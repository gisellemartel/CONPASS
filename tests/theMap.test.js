/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TheMap from '../components/map/index';

const mockRegion = {
  latitude: 45.492408,
  longitude: -73.582153,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04
};

const mockPoi = {
  result: {
    name: 'some name',
    formattedAddress: 'some address',
    geometry:
    {
      location: {
        lat: 45.492409,
        lng: -73.582153
      },
    }
  }
};

beforeEach(() => {
  getDestinationIfSet = jest.fn();
  updateRegionCloser = jest.fn();
});

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


it('Should fit screen to updated components', () => {
  const spy = jest.spyOn(TheMap.prototype, 'fitScreenToPath').mockImplementation(() => { return true; });
  wrapper = shallow(<TheMap nearbyMarkers={[]} updatedRegion={mockRegion} />);
  expect(spy).toHaveBeenCalled();
});

it('Should fetch and send the selected point of interest to the home component', async () => {
  getDestinationIfSet = jest.fn();
  updateRegionCloser = jest.fn();
  component = shallow(<TheMap nearbyMarkers={[]} updatedRegion={mockRegion} getDestinationIfSet={getDestinationIfSet} updateRegionCloser={updateRegionCloser} />);
  const spyGetDestinationIfSet = jest.spyOn(component.instance().props, 'getDestinationIfSet');
  const spyUpdateRegionCloser = jest.spyOn(component.instance().props, 'updateRegionCloser');
  global.fetch = jest.fn().mockImplementation(() => {
    const promise = new Promise((resolve) => {
      resolve({
        json: () => {
          return mockPoi;
        }
      });
    });
    return promise;
  });

  await component.instance().selectPoi({ nativeEvent: { placeId: '123' } });
  expect(spyGetDestinationIfSet).toHaveBeenCalled();
  expect(spyUpdateRegionCloser).toHaveBeenCalled();
});
