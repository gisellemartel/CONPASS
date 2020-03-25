import React from 'react';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import generateBuilding from '../assets/svgReactNative/buildingRepository';
import {
  Hall8, Hall9, Vl1, Vl2, Ve1, Ve2, Mb1, MbS2
} from '../assets/svgReactNative/index';

let mockDefaultAttributes;
let mockHallBuildingName;
let mockMBBuildingName;
let mockVLBuildingName;
let mockVEBuildingName;
let mockHallBuildingData;
let mockMBBuildingData;
let mockVLBuildingData;
let mockVEBuildingData;

beforeEach(() => {
  mockDefaultAttributes = {
    height: '325',
    preserveAspectRatio: 'xMinYMin slice',
    width: '325',
    viewBox: '0 0 1000 1000'
  };

  mockHallBuildingName = 'H';
  mockMBBuildingName = 'MB';
  mockVLBuildingName = 'VL';
  mockVEBuildingName = 'VE';

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

  mockMBBuildingData = [
    {
      floor: 8,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Mb1 {...mockDefaultAttributes} />
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
    <MbS2 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    }
  ];

  mockVLBuildingData = [
    {
      floor: 8,
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
      floor: 9,
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

  mockVEBuildingData = [
    {
      floor: 8,
      component:
  <ReactNativeZoomableView
    maxZoom={2}
    minZoom={1}
    zoomStep={0.5}
    initialZoom={1}
  >
    <Ve1 {...mockDefaultAttributes} />
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
    <Ve2 {...mockDefaultAttributes} />
  </ReactNativeZoomableView>
    }
  ];
});


/**
 * test generateBuilding function with invalid input
 * FAIL test
 */
it('Should return a null list when invalid value is passed', async () => {
  const result = generateBuilding('not a valid argument');
  expect(result).toStrictEqual(mockHallBuildingData);
});

/**
 * test generateBuilding function with invalid input returns empty list
*/
it('Should return a null list when invalid value is passed', async () => {
  const result = generateBuilding('not a valid argument');
  expect(result).toStrictEqual([]);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * Hall building
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockHallBuildingName);
  expect(result).toStrictEqual(mockHallBuildingData);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * FAIL test
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockHallBuildingName);
  expect(result).toStrictEqual([]);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * FAIL test
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockHallBuildingName);
  expect(result).toStrictEqual(mockMBBuildingData);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * MB building
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockMBBuildingName);
  expect(result).toStrictEqual(mockMBBuildingData);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * VL building
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockVLBuildingName);
  expect(result).toStrictEqual(mockVLBuildingData);
});

/**
 * test generateBuilding function returns expected result when passed valid argument
 * VE building
 */
it('Should return valid building data when passed valid argument', async () => {
  const result = generateBuilding(mockVEBuildingName);
  expect(result).toStrictEqual(mockVEBuildingData);
});
