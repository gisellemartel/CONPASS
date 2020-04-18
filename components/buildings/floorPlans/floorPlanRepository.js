import React from 'react';
import {
  Hall1,
  Hall2,
  Hall3,
  Hall4,
  Hall5,
  Hall6,
  Hall7,
  Hall8,
  Hall9,
  Hall10,
  Hall11,
  Hall12,
  Hall13,
  Vl1,
  Vl2
} from './index';

/**
 *
 * @param {*} buildingName - name of building to be be generated
 * function generates React Building component which will contain data for indoor view
 */
function generateFloorPlan(buildingName) {
  const defaultAttributes = {
    preserveAspectRatio: 'xMinYMin slice',
    viewBox: '0 0 1024 1024',
    width: 360,
    height: 360,
  };

  switch (buildingName) {
    case 'H':
      return [
        {
          floor: 1,
          component: <Hall1 {...defaultAttributes} />
        },
        {
          floor: 2,
          component: <Hall2 {...defaultAttributes} />
        },
        {
          floor: 3,
          component: <Hall3 {...defaultAttributes} />
        },
        {
          floor: 4,
          component: <Hall4 {...defaultAttributes} />
        },
        {
          floor: 5,
          component: <Hall5 {...defaultAttributes} />
        },
        {
          floor: 6,
          component: <Hall6 {...defaultAttributes} />
        },
        {
          floor: 7,
          component: <Hall7 {...defaultAttributes} />
        },
        {
          floor: 8,
          component: <Hall8 {...defaultAttributes} />
        },
        {
          floor: 9,
          component: <Hall9 {...defaultAttributes} />
        },
        {
          floor: 10,
          component: <Hall10 {...defaultAttributes} />
        },
        {
          floor: 11,
          component: <Hall11 {...defaultAttributes} />
        },
        {
          floor: 12,
          component: <Hall12 {...defaultAttributes} />
        },
        {
          floor: 13,
          component: <Hall13 {...defaultAttributes} />
        },
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
