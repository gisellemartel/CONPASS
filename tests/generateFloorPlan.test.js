import React from 'react';
import generateFloorPlan from '../components/buildings/floorPlans/floorPlanRepository';
import {
  Hall8, Hall9, Vl1, Vl2
} from '../components/buildings/floorPlans';

let mockDefaultAttributes;
let mockHallBuildingName;
let mockVLBuildingName;
let mockHallBuildingData;
let mockVLBuildingData;


beforeEach(() => {
  mockDefaultAttributes = {
    height: '100%',
    preserveAspectRatio: 'xMinYMin slice',
    width: '100%',
    viewBox: '0 0 1000 1000'
  };

  mockHallBuildingName = 'H';
  mockVLBuildingName = 'VL';

  mockHallBuildingData = [
    {
      floor: 8,
      component: <Hall8 {...mockDefaultAttributes} />
    },
    {
      floor: 9,
      component: <Hall9 {...mockDefaultAttributes} />
    }
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
it('Should return a null list when invalid value is passed', async () => {
  const result = generateFloorPlan('not a valid argument');
  expect(result).toStrictEqual([]);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Hall Building (H)', async () => {
  const result = generateFloorPlan(mockHallBuildingName);
  expect(result).toStrictEqual(mockHallBuildingData);
});

/**
 * Hall building
 */
it('Should return valid building data when passed valid argument, Vanier Library (VL)', async () => {
  const result = generateFloorPlan(mockVLBuildingName);
  expect(result).toStrictEqual(mockVLBuildingData);
});
