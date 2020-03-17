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
    {
      geometry:
        {
          location: {
            lat: 45.492409,
            lng: -73.582153
          }
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
  expect(searchBarComponent.state.region.latitude).toBeLessThanOrEqual(mockResult.result.geometry.location.lat + searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.latitude).toBeGreaterThanOrEqual(mockResult.result.geometry.location.lat - searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.longitude).toBeLessThanOrEqual(mockResult.result.geometry.location.lng + searchBarComponent.state.region.latitudeDelta);
  expect(searchBarComponent.state.region.longitude).toBeGreaterThanOrEqual(mockResult.result.geometry.location.lng - searchBarComponent.state.region.latitudeDelta);
});

it('Should Update the currentBuilding state with given a prediction from Google\'s API', async () => {
  const searchBarComponent = renderer.create(<SearchBar currentBuildingPred ={'1400 DeMaisonneuve W'}/>).getInstance();
  await searchBarComponent.updateCurrentBuilding();
  expect(searchBarComponent.state.currentBuilding.description).toBe('1400 de Maisonneuve West, Maisonneuve Boulevard West, Montreal, QC, Canada');
  expect(searchBarComponent.state.currentBuilding.id).toBe('ef79953defce3e028c4d5ec50e1b42677556cb8f');
  expect(searchBarComponent.state.currentBuilding.place_id).toBe('ChIJz2SwbmoayUwR5_D4CXsr5eM');
});

it('Should keep the currentBuilding state null', async () => {
  const searchBarComponent = renderer.create(<SearchBar currentBuildingPred ={''}/>).getInstance();
  await searchBarComponent.updateCurrentBuilding();
  expect(searchBarComponent.state.currentBuilding.description).toBeNull();
});

it('Should return an object identical to expectedJsonResult', async ()=>{
  const expectedJsonResult = {"predictions": [{"description": "1400 de Maisonneuve West, Maisonneuve Boulevard West, Montreal, QC, Canada", "id": "ef79953defce3e028c4d5ec50e1b42677556cb8f", "matched_substrings": [Array], "place_id": "ChIJz2SwbmoayUwR5_D4CXsr5eM", "reference": "ChIJz2SwbmoayUwR5_D4CXsr5eM", "structured_formatting": [Object], "terms": [Array], "types": [Array]}, {"description": "Webster Library, Concordia University, 1400 de Maisonneuve West, Maisonneuve Boulevard West, Montreal, QC, Canada", "id": "61b3338f1bdf19423ef736fe32f29a30932cff8b", "matched_substrings": [Array], "place_id": "ChIJrdodZWoayUwR3HZRx_qndrk", "reference": "ChIJrdodZWoayUwR3HZRx_qndrk", "structured_formatting": [Object], "terms": [Array], "types": [Array]}, {"description": "Concordia University - Sir George Williams Campus, 1400 Boulevard de Maisonneuve Ouest, Montreal, QC, Canada", "id": "0b4fc5e586b38018d9f165393d14789898edff8b", "matched_substrings": [Array], "place_id": "ChIJnXzeZWoayUwRO6q4kqnTAEY", "reference": "ChIJnXzeZWoayUwRO6q4kqnTAEY", "structured_formatting": [Object], "terms": [Array], "types": [Array]}, {"description": "Concordia University - Sir George Williams Campus, 1400 Boulevard de Maisonneuve West, Montreal, QC, Canada", "id": "e6c706e78f366f8b735dca8672867632a6687cdb", "matched_substrings": [Array], "place_id": "ChIJ0ZWDeWoayUwRKLBD7EV8dtY", "reference": "ChIJ0ZWDeWoayUwRKLBD7EV8dtY", "structured_formatting": [Object], "terms": [Array], "types": [Array]}, {"description": "Welcome Centre, 1400 de Maisonneuve West, Bishop Street, Montreal, QC, Canada", "id": "0fa3733411e0f54ff22e255cd60a02461ffbee7d", "matched_substrings": [Array], "place_id": "ChIJ122rcWoayUwRtqSQkqArCgU", "reference": "ChIJ122rcWoayUwRtqSQkqArCgU", "structured_formatting": [Object], "terms": [Array], "types": [Array]}], "status": "OK"};
  const searchBarComponent = renderer.create(<SearchBar currentBuildingPred ={'Webster Library Building'}/>).getInstance();
  const json = await searchBarComponent.getPredictions(searchBarComponent.props.currentBuildingPred);
  expect(json).toEqual(expectedJsonResult); 
});
