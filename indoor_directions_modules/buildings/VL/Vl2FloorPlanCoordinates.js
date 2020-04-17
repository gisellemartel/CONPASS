/**
 * Connected graph data structure
 * representing rooms, points of interest,
 * and paths of floor 2 in VL Building
 */

const vl2FloorPlanCoordinates = {
  203: {
    x: 650.666686,
    y: 391.333351,
    adjacencyList: [
      'node_203',
    ]
  },
  elevator: {
    x: 199.999985,
    y: 518,
    adjacencyList: [
      'node_elevator'
    ]
  },
  female_bathroom: {
    x: 650.000005,
    y: 287.00001,
    adjacencyList: [
      'node_staircase_4'
    ]
  },
  male_bathroom: {
    x: 650.000005,
    y: 204.00001,
    adjacencyList: [
      'node_staircase_2'
    ]
  },
  node_203: {
    x: 630,
    y: 390,
    adjacencyList: [
      'node_east',
      'node_north',
      'node_center',
      'node_study_area_5',
      'node_staircase_5'
    ]
  },
  node_center: {
    x: 455,
    y: 607,
    adjacencyList: [
      'node_study_area_3',
      'node_study_area_2_1',
      'node_study_area_6',
      'node_elevator',
      'node_staircase_5',
      'node_study_area_5',
      'node_east',
      'node_north',
      'node_203',
    ]
  },
  node_east: {
    x: 618,
    y: 561,
    adjacencyList: [
      'node_203',
      'node_center',
      'node_study_area_2_1',
      'node_study_area_5',
      'node_elevator',
      'node_staircase_5'
    ]
  },
  node_elevator: {
    x: 220.5,
    y: 607.453125,
    adjacencyList: [
      'elevator',
      'node_study_area_1',
      'node_center',
      'node_east',
      'node_study_area_5',
      'node_study_area_4',
      'node_study_area_6',
      'node_study_area_3',
      'node_study_area_2_1',
      'node_203'
    ]
  },
  node_north: {
    x: 512,
    y: 362,
    adjacencyList: [
      'node_study_area_5',
      'node_203',
      'node_staircase_6',
      'node_center',
      'node_east',
      'node_study_area_2_1',
      'node_study_area_3'
    ]
  },
  node_staircase_1: {
    x: 736.5,
    y: 815.453125,
    adjacencyList: [
      'staircase_1',
      'node_study_area_2_2',
      'node_study_area_3'
    ]
  },
  node_staircase_2: {
    x: 613,
    y: 258,
    adjacencyList: [
      'staircase_2',
      'male_bathroom',
      'node_staircase_4'
    ]
  },
  node_staircase_3: {
    x: 107.5,
    y: 939.453125,
    adjacencyList: [
      'staircase_3',
      'node_study_area_4',
      'node_study_area_6',
      'node_center'
    ]
  },
  node_staircase_4: {
    x: 613,
    y: 277,
    adjacencyList: [
      'staircase_4',
      'female_bathroom',
    ]
  },
  node_staircase_5: {
    x: 253,
    y: 493,
    adjacencyList: [
      'staircase_5',
      'node_study_area_5',
      'node_center',
      'node_east',
    ]
  },
  node_staircase_6: {
    x: 234,
    y: 354,
    adjacencyList: [
      'staircase_6',
      'node_north'
    ]
  },
  node_study_area_1: {
    x: 138.5,
    y: 615.453125,
    adjacencyList: [
      'study_area_1',
      'node_elevator',
      'node_study_area_6',
      'node_study_area_4',
      'node_staircase_3'
    ]
  },
  node_study_area_2_1: {
    x: 654.5,
    y: 709.453125,
    adjacencyList: [
      'study_area_2',
      'node_study_area_2_2',
      'node_center',
      'node_east'
    ]
  },
  node_study_area_2_2: {
    x: 653.5,
    y: 752.453125,
    adjacencyList: [
      'study_area_2',
      'node_study_area_2_1',
      'node_study_area_3',
      'node_staircase_1'
    ]
  },
  node_study_area_3: {
    x: 463.5,
    y: 771.453125,
    adjacencyList: [
      'study_area_3',
      'node_study_area_2_2',
      'node_staircase_1',
      'node_study_area_6',
      'node_elevator',
      'node_center',
      'node_east',
      'node_study_area_1'
    ]
  },
  node_study_area_4: {
    x: 208.5,
    y: 910.453125,
    adjacencyList: [
      'node_staircase_3',
      'study_area_4',
      'node_study_area_6',
      'node_elevator',
      'node_study_area_1'
    ]
  },
  node_study_area_5: {
    x: 374,
    y: 432,
    adjacencyList: [
      'study_area_5',
      'node_center',
      'node_east',
      'node_north',
      'node_study_area_6',
      'node_study_area_4',
      'node_study_area_3',
      'node_203'
    ]
  },
  node_study_area_6: {
    x: 208.5,
    y: 725.453125,
    adjacencyList: [
      'study_area_6',
      'node_study_area_1',
      'node_study_area_4',
      'node_study_area_3',
      'node_study_area_2_1',
      'node_elevator',
      'node_study_area_5',
      'node_center'
    ]
  },
  staircase_1: {
    x: 755.999986,
    y: 790.499999,
    adjacencyList: [
      'node_staircase_1'
    ]
  },
  staircase_2: {
    x: 548.999986,
    y: 201.499999,
    adjacencyList: [
      'node_staircase_2'
    ]
  },
  staircase_3: {
    x: 51.999986,
    y: 927.499999,
    adjacencyList: [
      'node_staircase_3'
    ]
  },
  staircase_4: {
    x: 548.999986,
    y: 276.499999,
    adjacencyList: [
      'node_staircase_4'
    ]
  },
  staircase_5: {
    x: 206.999986,
    y: 410.499999,
    adjacencyList: [
      'node_staircase_5'
    ]
  },
  staircase_6: {
    x: 206.999986,
    y: 316.499999,
    adjacencyList: [
      'node_staircase_6'
    ]
  },
  study_area_1: {
    x: 82,
    y: 597,
    adjacencyList: [
      'node_study_area_1'
    ]
  },
  study_area_2: {
    x: 612,
    y: 730,
    adjacencyList: [
      'node_study_area_2_1',
      'node_study_area_2_2'
    ]
  },
  study_area_3: {
    x: 412,
    y: 803,
    adjacencyList: [
      'node_study_area_3'
    ]
  },
  study_area_4: {
    x: 158,
    y: 941,
    adjacencyList: [
      'node_study_area_4'
    ]
  },
  study_area_5: {
    x: 326,
    y: 403,
    adjacencyList: [
      'node_study_area_5'
    ]
  },
  study_area_6: {
    x: 82,
    y: 730,
    adjacencyList: [
      'node_study_area_6'
    ]
  },
};


export default vl2FloorPlanCoordinates;
