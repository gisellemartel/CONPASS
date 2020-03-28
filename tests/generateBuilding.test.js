import React from 'react';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import generateBuilding from '../components/indoorPlans/buildingRepository';
import {
  Hall8, Hall9, Vl1, Vl2
} from '../components/indoorPlans/index';

let mockDefaultAttributes;
let mockHallBuildingName;
let mockVLBuildingName;
let mockHallBuildingData;
let mockVLBuildingData;


beforeEach(() => {
  mockDefaultAttributes = {
    height: '325',
    preserveAspectRatio: 'xMinYMin slice',
    width: '325',
    viewBox: '0 0 1000 1000'
  };

  mockHallBuildingName = 'H';
  mockVLBuildingName = 'VL';

  mockHallBuildingData = [
    {
      floor: 8,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Hall8 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    },
    {
      floor: 9,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Hall9 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    }
  ];


  mockVLBuildingData = [
    {
      floor: 1,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Vl1 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    },
    {
      floor: 2,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Vl2 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    }
  ];
});

/**
 * Invalid
*/
it('Should return a null list when invalid value is passed', async () => {
  const result = generateBuilding('not a valid argument');
  expect(result).toStrictEqual([]);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Hall Building (H)', async () => {
  const result = generateBuilding(mockHallBuildingName);
  expect(result).toStrictEqual(mockHallBuildingData);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Vanier Library (VL)', async () => {
  const result = generateBuilding(mockVLBuildingName);
  expect(result).toStrictEqual(mockVLBuildingData);
});
