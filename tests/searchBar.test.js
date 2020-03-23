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
  // Data taken from https://developers.google.com/places/web-service/search
  mockTextSearchResults = {
    html_attributions: [],
    results: [
      {
        geometry: {
          location: {
            lat: -33.870775,
            lng: 151.199025
          }
        },
        icon: 'http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png',
        id: '21a0b251c9b8392186142c798263e289fe45b4aa',
        name: 'Rhythmboat Cruises',
        opening_hours: {
          open_now: true
        },
        photos: [
          {
            height: 270,
            html_attributions: [],
            photo_reference: 'CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8',
            width: 519
          }
        ],
        place_id: 'ChIJyWEHuEmuEmsRm9hTkapTCrk',
        reference: 'CoQBdQAAAFSiijw5-cAV68xdf2O18pKIZ0seJh03u9h9wk_lEdG-cP1dWvp_QGS4SNCBMk_fB06YRsfMrNkINtPez22p5lRIlj5ty_HmcNwcl6GZXbD2RdXsVfLYlQwnZQcnu7ihkjZp_2gk1-fWXql3GQ8-1BEGwgCxG-eaSnIJIBPuIpihEhAY1WYdxPvOWsPnb2-nGb6QGhTipN0lgaLpQTnkcMeAIEvCsSa0Ww',
        types: ['travel_agency', 'restaurant', 'food', 'establishment'],
        vicinity: 'Pyrmont Bay Wharf Darling Dr, Sydney'
      }
    ],
    status: 'OK'
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

it('Calling getNearbyPlaces should pass an array to the nearbyMarkers property', async () => {
  // Mock API call retrieving search getNearbyPlaces coordinates.
  global.fetch = jest.fn().mockImplementation(() => {
    const promise = new Promise((resolve) => {
      resolve({
        json: () => {
          return mockTextSearchResults;
        }
      });
    });
    return promise;
  });
  let received;
  mockFct = (markers) => {
    received = markers;
  };
  const expected = [{
    id: mockTextSearchResults.results[0].id,
    title: mockTextSearchResults.results[0].name,
    description: mockTextSearchResults.results[0].formatted_address,
    coordinates: {
      latitude: mockTextSearchResults.results[0].geometry.location.lat,
      longitude: mockTextSearchResults.results[0].geometry.location.lng
    }
  }
  ];
  const searchBarComponent = renderer.create(<SearchBar nearbyMarkers={mockFct} updateRegion={updateR} />).getInstance();
  await searchBarComponent.getNearbyPlaces('coffee shops near sgw');
  expect(expected).toStrictEqual(received);
});
