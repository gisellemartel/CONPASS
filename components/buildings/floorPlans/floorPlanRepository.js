import React from 'react';
import {
  Hall8, Hall9, Vl1, Vl2
} from './index';

/**
 *
 * @param {*} buildingName - name of building to be be generated
 * function generates React Building component which will contain data for indoor view
 */
function generateFloorPlan(buildingName) {
  const defaultAttributes = {
    height: '100%',
    preserveAspectRatio: 'xMinYMin slice',
    width: '100%',
    viewBox: '0 0 1000 1000'
  };

  switch (buildingName) {
    case 'H':
      return [
        {
          floor: 8,
          component: <Hall8 {...defaultAttributes} />
        },
        {
          floor: 9,
          component: <Hall9 {...defaultAttributes} />
        }
      ];
    case 'VL':
      return [
        {
          floor: 1,
          component: <Vl1 {...defaultAttributes} />
        },
        {
          floor: 2,
          component: <Vl2 {...defaultAttributes} />
        }
      ];
    default:
      return [];
  }
}

export default generateFloorPlan;
