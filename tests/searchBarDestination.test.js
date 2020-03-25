/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import SearchBarDestination from '../components/searchBarDestination';

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
    {
      geometry:
        {
          location: {
            lat: 45.492409,
            lng: -73.582153
          },
        }
    }
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

  const searchBarComponent = renderer.create(<SearchBarDestination />).getInstance();
  await searchBarComponent.onChangeDestination('Loyola');
  expect(searchBarComponent.state.predictions).toBe(mockPrediction.predictions);
});

// this.props.updateRegion() in the home component throws a wrench into the success of this test...
it('Should draw a path with content', async () => {
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
  const searchBarComponent = renderer.create(<SearchBarDestination updatedRegion={updateR} />).getInstance();
  await searchBarComponent.getLatLong(mockPrediction.predictions[0].place_id);
  expect(searchBarComponent.state.destinationRegion.latitude).toBe(mockResult.result.geometry.location.lat);
  expect(searchBarComponent.state.destinationRegion.longitude).toBe(mockResult.result.geometry.location.lng);
});
