/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import BuildingWithFloors from '../components/buildings/buildingView/buildingWithFloors';
import dijkstraPathfinder from '../indoor_directions_modules/dijkstraPathfinder';

beforeEach(() => {
  mockGraphFloor1 = {
    101: {
      x: 1,
      y: 1,
      adjacencyList: [
        '102',
        '104'
      ]
    },
    102: {
      x: 2,
      y: 1.5,
      adjacencyList: [
        '101',
        '103'
      ]
    },
    103: {
      x: 3,
      y: 1,
      adjacencyList: [
        '102',
        '105'
      ]
    },
    104: {
      x: 1.5,
      y: 3,
      adjacencyList: [
        '101',
        '106'
      ]
    },
    105: {
      x: 2.5,
      y: 3,
      adjacencyList: [
        '103',
        '108',
        'escalator'
      ]
    },
    106: {
      x: 1,
      y: 5,
      adjacencyList: [
        '102',
        '107'
      ]
    },
    107: {
      x: 2,
      y: 4.5,
      adjacencyList: [
        '106',
        '108',
        'escalator'
      ]
    },
    108: {
      x: 3,
      y: 5,
      adjacencyList: [
        '105',
        '107'
      ]
    },
    escalator: {
      x: 2,
      y: 3,
      adjacencyList: [
        '105',
        '108'
      ]
    }
  };
  mockGraphFloor2 = {
    201: {
      x: 2,
      y: 1,
      adjacencyList: [
        '202',
        '203'
      ]
    },
    202: {
      x: 1,
      y: 3,
      adjacencyList: [
        '201',
        '204',
        'escalator'
      ]
    },
    203: {
      x: 3,
      y: 3,
      adjacencyList: [
        '201',
        '204',
      ]
    },
    204: {
      x: 2,
      y: 4,
      adjacencyList: [
        '202',
        '203',
      ]
    },
    escalator: {
      x: 2,
      y: 3,
      adjacencyList: [
        '202'
      ]
    }
  };
  mockGraphs = {
    1: mockGraphFloor1,
    2: mockGraphFloor2
  };
});

it('Should return the proper distance', () => {
  const distance = dijkstraPathfinder.nodeDistance('101', '102', mockGraphFloor1);
  expect(distance).toBe(1.118033988749895);
});

it('Should indicate new node is not in closed list', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 };
  const closedList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 }
  ];
  const isAnalyzed = dijkstraPathfinder.isAnalyzed(closedList, adjacencyNode);
  expect(isAnalyzed).toBe(false);
});

it('Should indicate analyzed node is in closed list', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 };
  const closedList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 }
  ];
  const isAnalyzed = dijkstraPathfinder.isAnalyzed(closedList, adjacencyNode);
  expect(isAnalyzed).toBe(true);
});

it('Should add new node while maintaining sorted distance', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 };
  const openList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 }];
  const expectedOpenList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 },
    { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 }];
  const newOpenList = dijkstraPathfinder.handleNodeAnalysis(openList, adjacencyNode);
  expect(newOpenList).toStrictEqual(expectedOpenList);
});

it('Should do nothing if new distance is higher', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const newAdjacencyNodePredecessor = { id: '104', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '103', predecessor: newAdjacencyNodePredecessor, distance: 100 };
  const openList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 }];
  const newOpenList = dijkstraPathfinder.handleNodeAnalysis(openList, adjacencyNode);
  expect(newOpenList).toStrictEqual(openList);
});

it('Should replace existing node details & sort openList if new distance is lower', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const newAdjacencyNodePredecessor = { id: '104', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '103', predecessor: newAdjacencyNodePredecessor, distance: 1.5 };
  const openList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 },
    { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 }];
  const expectedOpenList = [
    { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '103', predecessor: newAdjacencyNodePredecessor, distance: 1.5 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 }];
  const newOpenList = dijkstraPathfinder.handleNodeAnalysis(openList, adjacencyNode);
  expect(newOpenList).toStrictEqual(expectedOpenList);
});

it('Should convert the finish node to a proper SVG polyline', () => {
  const startNode = { id: '101', predecessor: undefined, distance: 0 };
  const intermediateNode = { id: '102', predecessor: startNode, distance: 1.12 };
  const finishNode = { id: '103', predecessor: intermediateNode, distance: 2.24 };
  const svgPolylinePoints = dijkstraPathfinder.createShortestPath(finishNode, [{ start: '101', finish: '103' }], [mockGraphFloor1]);
  expect(svgPolylinePoints).toStrictEqual(['10.3173828125,5.3173828125 10.634765625,5.47607421875 10.9521484375,5.3173828125 ']);
});

it('Should give directions for a single floor', () => {
  const building = { building: 'T', buildingName: 'Test Building' };
  const floors = [{ floor: 1, component: null }, { floor: 2, component: null }];
  const interiorModeOff = jest.fn();
  const buildingWithFloorsComponent = renderer.create(
    <BuildingWithFloors
      building={building}
      buildingFloorPlans={floors}
      floor={floors[0]}
      adjacencyGraphs={mockGraphs}
      interiorModeOff={interiorModeOff}
    />
  ).getInstance();
  buildingWithFloorsComponent.dijkstraHandler('101', '107');
  expect(buildingWithFloorsComponent.state.directionPath).toStrictEqual({
    1: '10.3173828125,5.3173828125 10.47607421875,5.9521484375 10.3173828125,6.5869140625 10.634765625,6.42822265625 '
  });
});

it('Should give directions for multiple floors', () => {
  const building = { building: 'T', buildingName: 'Test Building' };
  const floors = [{ floor: 1, component: null }, { floor: 2, component: null }];
  const interiorModeOff = jest.fn();
  const buildingWithFloorsComponent = renderer.create(
    <BuildingWithFloors
      building={building}
      buildingFloorPlans={floors}
      floor={floors[0]}
      adjacencyGraphs={mockGraphs}
      interiorModeOff={interiorModeOff}
    />
  ).getInstance();
  buildingWithFloorsComponent.dijkstraHandler('101', '203');
  expect(buildingWithFloorsComponent.state.directionPath).toStrictEqual({
    1: '10.3173828125,5.3173828125 10.634765625,5.47607421875 10.9521484375,5.3173828125 10.79345703125,5.9521484375 10.634765625,5.9521484375 ',
    2: '10.634765625,5.9521484375 10.3173828125,5.9521484375 10.634765625,6.26953125 10.9521484375,5.9521484375 '
  });
});
