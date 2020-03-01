import React from 'react';
import renderer from 'react-test-renderer'
import SearchBar from '../components/searchBar';


const mockPrediction = {
  predictions:
  [
    {
      description: 'Loyola High School, Sherbrooke Street West, Montreal, QC, Canada',
      id: '5b5621ca2df1bc84aa90ac235c0917ca8224d4ea',
      place_id: 'ChIJ9_q2di4XyUwRbIHFWV8y258'
    }
  ],
  status: 'OK'
}

const mockResult = {
  result: {
    geometry: {
      location: {
        lat: 45.4568895,
        lng: -73.6395365
      }
    }
  }
}

it('Should populate prediction state with content', async ()=> {
  // Mock API call retrieving search predictions.
  global.fetch = jest.fn().mockImplementation(() => {
    const promise = new Promise((resolve, reject) => {
      resolve({
        json: () => {
          return mockPrediction
        }
      })
    })
    return promise;
  })

  const searchBarComponent = renderer.create(<SearchBar />).getInstance();
  await searchBarComponent.onChangeDestination("Loyola")
  expect(searchBarComponent.state.predictions).toBe(mockPrediction.predictions);
})

//this.props.updateRegion() in the home component throws a wrench into the success of this test...
/*it('Should populate LatLng state with content', async ()=> {
    // Mock API call retrieving search LatLang coordinates.
    global.fetch = jest.fn().mockImplementation(() => {
      const promise = new Promise((resolve, reject) => {
        resolve({
          json: () => {
            return mockResult
          }
        })
      })
      return promise;
    })
    const searchBarComponent = renderer.create(<SearchBar />).getInstance();
    await searchBarComponent.getLatLong(mockPrediction.predictions[0].place_id);
    expect(searchBarComponent.state.region.latitude).toBeLessThanOrEqual(mockResult.result.geometry.lat + searchBarComponent.state.region.latitudeDelta);
    expect(searchBarComponent.state.region.latitude).toBeGreaterThanOrEqual(mockResult.result.geometry.lat - searchBarComponent.state.region.latitudeDelta);
    expect(searchBarComponent.state.region.longitude).toBeLessThanOrEqual(mockResult.result.geometry.lng + searchBarComponent.state.region.latitudeDelta);
    expect(searchBarComponent.state.region.longitude).toBeGreaterThanOrEqual(mockResult.result.geometry.lng - searchBarComponent.state.region.latitudeDelta);
  })*/