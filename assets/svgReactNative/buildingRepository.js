import React from 'react';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {
  Hall8, Hall9, Vl1, Vl2
} from './index';

/**
 * Makes floor map component zoomable
 * @param {*} floorComponent - floor JSX element to be nested in zoomable component
 */
function generateZoomableFloorComponent(floorComponent) {
  return (
    <ReactNativeZoomableView
      maxZoom={2}
      minZoom={1}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders
    >
      {floorComponent}
    </ReactNativeZoomableView>
  );
}

/**
 *
 * @param {*} buildingName - name of building to be be generated
 * function generates React Building component which will contain data for indoor view
 */
function generateBuilding(buildingName) {
  const defaultAttributes = {
    height: '325',
    preserveAspectRatio: 'xMinYMin slice',
    width: '325',
    viewBox: '0 0 1000 1000'
  };

  switch (buildingName) {
    case 'H':
      return [
        {
          floor: 8,
          component: generateZoomableFloorComponent(<Hall8 {...defaultAttributes} />)
        },
        {
          floor: 9,
          component: generateZoomableFloorComponent(<Hall9 {...defaultAttributes} />)
        }
      ];
    case 'VL':
      return [
        {
          floor: 1,
          component: generateZoomableFloorComponent(<Vl1 {...defaultAttributes} />)
        },
        {
          floor: 2,
          component: generateZoomableFloorComponent(<Vl2 {...defaultAttributes} />)
        }
      ];
    default:
      return [];
  }
}

export default generateBuilding;
