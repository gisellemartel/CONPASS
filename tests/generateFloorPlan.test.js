import React from 'react';
import generateFloorPlan from '../components/buildings/floorPlans/floorPlanRepository';
import {
  Hall1, Hall2, Hall3, Hall4, Hall5, Hall6, Hall7, Hall8, Hall9, Hall10, Hall11, Hall12, Hall13, Vl1, Vl2
} from '../components/buildings/floorPlans';

let mockDefaultAttributes;
let mockHallBuildingName;
let mockVLBuildingName;
let mockHallBuildingData;
let mockVLBuildingData;


beforeEach(() => {
  mockDefaultAttributes = {
    preserveAspectRatio: 'xMinYMin slice',
    viewBox: '0 0 1024 1024',
    width: 360,
    height: 360,
  };

  mockHallBuildingName = 'H';
  mockVLBuildingName = 'VL';

  mockHallBuildingData = [

    {
      floor: 1,
      component: <Hall1 {...mockDefaultAttributes} />
    },
    {
      floor: 2,
      component: <Hall2 {...mockDefaultAttributes} />
    },
    {
      floor: 3,
      component: <Hall3 {...mockDefaultAttributes} />
    },
    {
      floor: 4,
      component: <Hall4 {...mockDefaultAttributes} />
    },
    {
      floor: 5,
      component: <Hall5 {...mockDefaultAttributes} />
    },
    {
      floor: 6,
      component: <Hall6 {...mockDefaultAttributes} />
    },
    {
      floor: 7,
      component: <Hall7 {...mockDefaultAttributes} />
    },
    {
      floor: 8,
      component: <Hall8 {...mockDefaultAttributes} />
    },
    {
      floor: 9,
      component: <Hall9 {...mockDefaultAttributes} />
    },
    {
      floor: 10,
      component: <Hall10 {...mockDefaultAttributes} />
    },
    {
      floor: 11,
      component: <Hall11 {...mockDefaultAttributes} />
    },
    {
      floor: 12,
      component: <Hall12 {...mockDefaultAttributes} />
    },
    {
      floor: 13,
      component: <Hall13 {...mockDefaultAttributes} />
    },
  ];


  mockVLBuildingData = [
    {
      floor: 1,
      component: <Vl1 {...mockDefaultAttributes} />
    },
    {
      floor: 2,
      component: <Vl2 {...mockDefaultAttributes} />
    }
  ];
});

/**
 * Invalid
*/
it('Should return a null list when invalid value is passed', () => {
  const result = generateFloorPlan('not a valid argument');
  expect(result).toStrictEqual([]);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Hall Building (H)', () => {
  const result = generateFloorPlan(mockHallBuildingName);
  expect(result).toStrictEqual(mockHallBuildingData);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Vanier Library (VL)', () => {
  const result = generateFloorPlan(mockVLBuildingName);
  expect(result).toStrictEqual(mockVLBuildingData);
});
