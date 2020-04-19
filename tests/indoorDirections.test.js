import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { IndoorDirections } from '../components/directions/indoorDirections';
import generateIndoorPredictionsForSearchBar from '../components/home/generateIndoorPredictionsForSearchBar';

const mockStore = configureStore([]);

let store;
let instanceIndoorDirections;
let mockBuildingInfoData;
let mockIndoorRoomsList;

describe('IndoorDirections', () => {
  beforeEach(() => {
    store = mockStore({
      accessibilty: 'ACCESSIBILITY_ON',
      startBuildingNode: {
        building: 'H',
        coordinates: {
          latitude: 45.497092,
          longitude: -73.5788,
        },
        description: 'H-103',
        dijkstraId: '103',
        floor: '1',
        id: 'H-103',
        origin: 'north_exit',
        place_id: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
      },
      endBuildingNode: {
        building: 'H',
        coordinates: {
          latitude: 45.497092,
          longitude: -73.5788,
        },
        description: 'H-103',
        dijkstraId: '103',
        floor: '1',
        id: 'H-103',
        origin: 'north_exit',
        place_id: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
      },
    });
    const setBuildingInfoModalVisibilityTo = jest.fn();
    const turnInteriorModeOff = jest.fn();
    const getRegionFromOutdoorDirections = jest.fn();
    const getCoordinatesFromOutdoorDirections = jest.fn();
    const changeVisibilityTo = jest.fn();
    const mockRegion = {
      latitude: 45.492408,
      longitude: -73.582153,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    };

    mockBuildingInfoData = {
      campus: 'SGW',
      building: 'H',
      buildingName: 'Henry F. Hall Building',
      accessiblity: true,
      placesToGo: [{
        name: 'Hall 4 Café - The Green Beet',
        id: '7',
        placeID: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
        opening: ['8:00 am', '9:30 pm'],
        image: require('../assets/polygons/images/hallCafe.jpg')
      },
      {
        name: 'Hive Café Solidarity Cooperative',
        id: '7.1',
        placeID: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
        opening: ['8:00 am', '9:30 pm'],
        image: require('../assets/polygons/images/hallCafe.jpg')
      }
      ],
      address: '1455 DeMaisonneuve W',
      latitude: 45.497092,
      longtitude: -73.578800,
      image: [{ image: require('../assets/polygons/images/hallCafe.jpg') }],
      tunnelAccessiblity: true,
      polygon: {
        name: 'Henry F. Hall Building',
        coordinates:
                [
                  { latitude: 45.497373, longitude: -73.578336 },
                  { latitude: 45.497710, longitude: -73.579032 },
                  { latitude: 45.497164, longitude: -73.579545 },
                  { latitude: 45.496829, longitude: -73.578848 },
                ]
      }
    };

    mockIndoorRoomsList = generateIndoorPredictionsForSearchBar();

    instanceIndoorDirections = shallow(
      <IndoorDirections
        store={store}
        startBuildingNode={mockBuildingInfoData}
        endBuildingNode={mockBuildingInfoData}
        getDestinationIfSet={null}
        getRegion={getRegionFromOutdoorDirections}
        getRegionFromSearch={mockRegion}
        getCoordinates={getCoordinatesFromOutdoorDirections}
        building={mockBuildingInfoData}
        showBuildingInfoModal={false}
        setBuildingInfoModalVisibilityTo={setBuildingInfoModalVisibilityTo}
        turnInteriorModeOff={turnInteriorModeOff}
        buildingInfoData={mockBuildingInfoData}
        changeVisibilityTo={changeVisibilityTo}
        indoorRoomsList={mockIndoorRoomsList}
      />
    ).instance();
  });

  it('Should cut the string of the building name if it is too long', () => {
    // length: 26, maximum allowed is 24
    const stringTooLong26 = '11111111111111111111111111';
    const cutString24 = instanceIndoorDirections.limitNameLength(stringTooLong26);
    expect(cutString24.length).toBe(24);
  });

  it('Should give directions for a single floor', async () => {
    instanceIndoorDirections.setState({
      currentBuilding: mockBuildingInfoData,
      origin: '101',
      originFloor: {floor: 1}
    });

    instanceIndoorDirections.dijkstraHandler('103', 1);

    expect(instanceIndoorDirections.state.indoorDirectionsPolyline).toStrictEqual({
      1: '10.3173828125,5.3173828125 10.47607421875,5.9521484375 10.3173828125,6.5869140625 10.634765625,6.42822265625 '
    });
  });

  it('Should give directions for multiple floors', async () => {
    instanceIndoorDirections.setState({
      origin: '101',
      originFloor: { floor: 1 },
      currentBuilding: mockBuildingInfoData
    });
    instanceIndoorDirections.dijkstraHandler('203', 2);
    expect(instanceIndoorDirections.state.directionPath).toStrictEqual({
      1: '10.3173828125,5.3173828125 10.634765625,5.47607421875 10.9521484375,5.3173828125 10.79345703125,5.9521484375 10.634765625,5.9521484375 ',
      2: '10.634765625,5.9521484375 10.3173828125,5.9521484375 10.634765625,6.26953125 10.9521484375,5.9521484375 '
    });
  });
});
