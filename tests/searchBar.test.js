/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../components/searchBar';

beforeEach(() => {
  mockPrediction = {
    predictions:
    [
      {
        description: 'Loyola High School, Sherbrooke Street West, Montreal, QC, Canada',
        id: '5b5621ca2df1bc84aa90ac235c0917ca8224d4ea',
        place_id: 'ChIJ9_q2di4XyUwRbIHFWV8y258'
      }
    ],
    status: 'OK'
  };
  mockResult = {
    result:
    [{
      geometry:
      [
        {
          lat: 45.492409,
          lng: -73.582153
        }
      ]
    }
    ]
  };
  updateR = jest.fn();
});


it('Should populate prediction state with content', async () => {
  // Mock API call retrieving search predictions.
  global.fetch = jest.fn().mockImplementation(() => {
    const promise = new Promise((resolve) => {
      resolve({
        json: () => {
          return mockPrediction;
        }
      });
    });
    return promise;
  });

  const searchBarComponent = renderer.create(<SearchBar />).getInstance();
  await searchBarComponent.onChangeDestination('Loyola');
  expect(searchBarComponent.state.predictions).toBe(mockPrediction.predictions);
});

// this.props.updateRegion() in the home component throws a wrench into the success of this test...
it('Should populate LatLng state with content', async () => {
  // Mock API call retrieving search LatLang coordinates.
  global.fetch = jest.fn().mockImplementation(() => {
    const promise = new Promise((resolve) => {
      resolve({
        json: () => {
          return mockResult;
        }
      });
    });
    return promise;
  });
  const searchBarComponent = renderer.create(<SearchBar updateRegion={updateR} />).getInstance();
  await searchBarComponent.getLatLong(mockPrediction.predictions[0].place_id);
  expect(searchBarComponent.state.region.latitude).toBeLessThanOrEqual(mockResult.result[0].geometry[0].lat + searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.latitude).toBeGreaterThanOrEqual(mockResult.result[0].geometry[0].lat - searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.longitude).toBeLessThanOrEqual(mockResult.result[0].geometry[0].lng + searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.longitude).toBeGreaterThanOrEqual(mockResult.result[0].geometry[0].lng - searchBarComponent.state.region.latitudeDelta);
});
