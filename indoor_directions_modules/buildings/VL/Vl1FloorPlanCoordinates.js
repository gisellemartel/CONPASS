/**
 * Connected graph data structure
 * representing rooms, points of interest,
 * and paths of floor 1 in VL Building
 */

const vl1FloorPlanCoordinates = {
  122: {
    x: 372.6664,
    y: 423.99981,
    adjacencyList: [
      'node_122'
    ]
  },
  admin: {
    x: 203.33274,
    y: 610.66683,
    adjacencyList: [
      'node_admin'
    ]
  },
  circ: {
    x: 661.22227,
    y: 624.00019,
    adjacencyList: [
      'node_circ'
    ]
  },
  elevator: {
    x: 230,
    y: 550,
    adjacencyList: [
      'node_elevator'
    ]
  },
  female_bathroom: {
    x: 730.33395,
    y: 285.66639,
    adjacencyList: [
      'node_female_bathroom',
      'node_female_bathroom_2'
    ]
  },
  ill: {
    x: 608.66685,
    y: 624.00019,
    adjacencyList: [
      'node_ill'
    ]
  },
  male_bathroom: {
    x: 729.00061,
    y: 224.33294,
    adjacencyList: [
      'node_male_bathroom',
      'node_male_bathroom_2'
    ]
  },
  node_122: {
    x: 395,
    y: 488,
    adjacencyList: [
      '122',
      'node_staircase_5',
      'node_center',
      'node_study_area_1',
      'node_intersection_south'
    ]
  },
  node_admin: {
    x: 219,
    y: 654,
    adjacencyList: [
      'admin',
      'node_staircase_3',
      'node_study_area_2',
      'node_study_area_1',
      'node_center'
    ]
  },
  node_center: {
    x: 300,
    y: 655,
    adjacencyList: [
      'node_study_area_1',
      'node_study_area_2',
      'node_admin',
      'node_staircase_5',
      'node_122',
      'node_elevator'
    ]
  },
  node_circ: {
    x: 679,
    y: 582,
    adjacencyList: [
      'circ',
      'node_ill',
      'node_ref',
      'node_intersection_south',
      'node_library_door'
    ]
  },
  node_elevator: {
    x: 255,
    y: 565,
    adjacencyList: [
      'elevator',
      'node_staircase_5',
      'node_center'
    ]
  },
  node_female_bathroom: {
    x: 745,
    y: 352,
    adjacencyList: [
      'female_bathroom',
      'node_intersection_center',
      'node_special_collections_2_2'
    ]
  },
  node_female_bathroom_2: {
    x: 805,
    y: 299,
    adjacencyList: [
      'female_bathroom',
      'node_library_front',
      'node_male_bathroom_2'
    ]
  },
  node_hallway_north: {
    x: 618,
    y: 160,
    adjacencyList: [
      'special_collections_3',
      'node_hallway_northeast',
      'node_staircase_2'
    ]
  },
  node_hallway_northeast: {
    x: 725,
    y: 160,
    adjacencyList: [
      'node_hallway_north',
      'node_male_bathroom'
    ]
  },
  node_ill: {
    x: 624,
    y: 587,
    adjacencyList: [
      'ill',
      'node_circ',
      'node_ref',
      'node_intersection_south',
      'node_library_door'
    ]
  },
  node_intersection_center: {
    x: 618,
    y: 425,
    adjacencyList: [
      'node_special_collections_2_2',
      'node_staircase_4',
      'node_female_bathroom',
      'node_library_door',
      'node_intersection_south',
    ]
  },
  node_intersection_south: {
    x: 618,
    y: 488,
    adjacencyList: [
      'node_intersection_center',
      'node_library_door',
      'node_ref',
      'node_circ',
      'node_ill',
      'node_122'
    ]
  },
  node_library_door: {
    x: 782,
    y: 522,
    adjacencyList: [
      'node_intersection_center',
      'node_intersection_south',
      'node_library_front',
      'node_circ',
      'node_ill',
      'node_ref'
    ]
  },
  node_library_front: {
    x: 805,
    y: 522,
    adjacencyList: [
      'node_library_door',
      'exit',
      'node_female_bathroom_2'
    ]
  },
  node_male_bathroom: {
    x: 724,
    y: 192,
    adjacencyList: [
      'male_bathroom',
      'node_hallway_northeast'
    ]
  },
  node_male_bathroom_2: {
    x: 805,
    y: 250,
    adjacencyList: [
      'male_bathroom',
      'node_female_bathroom_2'
    ]
  },
  exit: {
    x: 958,
    y: 554,
    adjacencyList: [
      'node_library_front'
    ]
  },
  node_ref: {
    x: 549,
    y: 537,
    adjacencyList: [
      'node_circ',
      'node_ill',
      'node_library_door',
      'node_intersection_south',
      'node_intersection_center'
    ]
  },
  node_special_collections_1_2: {
    x: 283,
    y: 354,
    adjacencyList: [
      'special_collections_1',
      'node_special_collections_2_2'
    ]
  },
  node_special_collections_2: {
    x: 425,
    y: 160,
    adjacencyList: [
      'special_collections_2',
      'node_staircase_6',
      'node_hallway_north'
    ]
  },
  node_special_collections_2_2: {
    x: 496,
    y: 356,
    adjacencyList: [
      'special_collections_2',
      'node_special_collections_1_2',
      'node_intersection_center',
      'node_female_bathroom',
      'node_staircase_4'
    ]
  },
  node_staircase_1: {
    x: 782,
    y: 749,
    adjacencyList: [
      'staircase_1',
      'node_library_door'
    ]
  },
  node_staircase_2: {
    x: 618,
    y: 205,
    adjacencyList: [
      'staircase_2',
      'node_staircase_4',
      'node_hallway_north'
    ]
  },
  node_staircase_3: {
    x: 123,
    y: 914,
    adjacencyList: [
      'staircase_3',
      'node_study_area_2',
      'study_area_2',
      'node_admin'
    ]
  },
  node_staircase_4: {
    x: 618,
    y: 310,
    adjacencyList: [
      'staircase_4',
      'node_staircase_2',
      'node_intersection_center'
    ]
  },
  node_staircase_5: {
    x: 250,
    y: 488,
    adjacencyList: [
      'staircase_5',
      'node_center',
      'node_122',
      'node_study_area_1',
      'node_elevator'
    ]
  },
  node_staircase_6: {
    x: 282,
    y: 160,
    adjacencyList: [
      'staircase_6',
      'special_collections_1',
      'node_special_collections_2'
    ]
  },
  node_study_area_1: {
    x: 488,
    y: 750,
    adjacencyList: [
      'node_center',
      'node_122',
      'node_admin',
      'node_staircase_5'
    ]
  },
  node_study_area_2: {
    x: 204,
    y: 884,
    adjacencyList: [
      'node_center',
      'node_admin',
      'node_staircase_3'
    ]
  },
  ref: {
    x: 505.99999,
    y: 558.66673,
    adjacencyList: [
      'node_ref',
    ]
  },
  special_collections_1: {
    x: 248.39114,
    y: 260,
    adjacencyList: [
      'node_special_collections_1_2',
      'node_staircase_6'
    ]
  },
  special_collections_2: {
    x: 398.96096,
    y: 259.9995,
    adjacencyList: [
      'node_special_collections_2',
      'node_special_collections_2_2'
    ]
  },
  special_collections_3: {
    x: 579.06751,
    y: 97.8682,
    adjacencyList: [
      'node_hallway_north'
    ]
  },
  staircase_1: {
    x: 804.00076,
    y: 784.54512,
    adjacencyList: [
      'node_staircase_1',
    ]
  },
  staircase_2: {
    x: 548.00026,
    y: 179.16623,
    adjacencyList: [
      'node_staircase_2',
    ]
  },
  staircase_3: {
    x: 101.33273,
    y: 929.50101,
    adjacencyList: [
      'node_staircase_3',
    ]
  },
  staircase_4: {
    x: 548.00026,
    y: 291.16644,
    adjacencyList: [
      'node_staircase_4',
    ]
  },
  staircase_5: {
    x: 203.9996,
    y: 395.16666,
    adjacencyList: [
      'node_staircase_5',
    ]
  },
  staircase_6: {
    x: 209.33294,
    y: 136.49948,
    adjacencyList: [
      'node_staircase_6',
    ]
  },
  study_area_1: {
    x: 451.44357,
    y: 817.3339,
    adjacencyList: [
      'node_study_area_1',
    ]
  },
  study_area_2: {
    x: 163.33267,
    y: 956.00083,
    adjacencyList: [
      'node_study_area_2',
    ]
  },
};

export default vl1FloorPlanCoordinates;
