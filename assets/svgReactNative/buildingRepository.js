import React from 'react';
import {
  Hall8, Hall9, Vl1, Vl2
} from './index';

function generateBuilding(buildingName) {
  const defaultAttributes = {
    height: '300',
    preserveAspectRatio: 'xMinYMin slice',
    width: '300',
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

export default generateBuilding;
