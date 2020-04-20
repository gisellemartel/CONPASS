/* eslint-disable max-len */
import dijkstraPathfinder from '../indoor_directions_modules/dijkstraPathfinder';
import generateGraph from '../indoor_directions_modules/graphRepository';
import floorWaypointFinder from '../indoor_directions_modules/floorWaypointFinder';
import distanceBetweenTwoNodes from '../indoor_directions_modules/distanceBetweenTwoNodes';

jest.mock('../indoor_directions_modules/graphRepository');

let mockGraphFloor1;
let mockGraphFloor2;

beforeEach(() => {
  const mockGraphFloor1 = {
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
  const mockGraphFloor2 = {
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
  generateGraph.mockImplementation(() => { return { 1: mockGraphFloor1, 2: mockGraphFloor2 }; });
});

it('Should return the proper distance', () => {
  const distance = distanceBetweenTwoNodes.nodeDistance(mockGraphFloor1['101'], mockGraphFloor1['102']);
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
  expect(svgPolylinePoints).toStrictEqual(['0.3515625,0.3515625 0.703125,0.52734375 1.0546875,0.3515625 ']);
});

it('Should give the slope of a line', () => {
  const startNode = { x: 1, y: 2, adjacency_list: [] };
  const endNode = { x: 2, y: 4, adjacency_list: [] };
  const slope = floorWaypointFinder.calculateSlope([startNode, endNode]);
  expect(slope).toBe(2);
});

it('Should give the slope as infinity if deltaX is 0', () => {
  const startNode = { x: 2, y: 2, adjacency_list: [] };
  const endNode = { x: 2, y: 4, adjacency_list: [] };
  const slope = floorWaypointFinder.calculateSlope([startNode, endNode]);
  expect(slope).toBe(Infinity);
});

it('Should give the intercept of a line', () => {
  const slope = 0.5;
  const node = { x: 3, y: 2, adjacency_list: [] };
  const intercept = floorWaypointFinder.calculateIntercept(slope, node);
  expect(intercept).toBe(0.5);
});

it('Should give the intersection of two points', () => {
  const expectedIntersect = { x: 2, y: 7 };
  const slope1 = 2;
  const slope2 = 3;
  const intercept1 = 3;
  const intercept2 = 1;
  const intersect = floorWaypointFinder.intersectionOfTwoPoints(slope1, slope2, intercept1, intercept2);
  expect(intersect).toStrictEqual(expectedIntersect);
});

it('Should give waypoint distance (case where intersect is between start and end)', () => {
  const waypointNode = { x: 2, y: 2, adjacency_list: [] };
  const startNode = { x: 2, y: 0, adjacency_list: [] };
  const endNode = { x: 0, y: 2, adjacency_list: [] };
  const distance = floorWaypointFinder.distanceToWaypointCalculator(waypointNode, startNode, endNode);
  expect(distance).toBe(1.4142135623730951);
});

it('Should give waypoint distance (case where intersect is outside of start and end)', () => {
  const waypointNode = { x: 0, y: 4, adjacency_list: [] };
  const startNode = { x: 2, y: 0, adjacency_list: [] };
  const endNode = { x: 0, y: 2, adjacency_list: [] };
  const distance = floorWaypointFinder.distanceToWaypointCalculator(waypointNode, startNode, endNode);
  expect(distance).toBe(2.8284271247461903);
});

it('Should give waypoint distance (case where start and end line is horizontal)', () => {
  const waypointNode = { x: 1, y: 2, adjacency_list: [] };
  const startNode = { x: 0, y: 0, adjacency_list: [] };
  const endNode = { x: 2, y: 0, adjacency_list: [] };
  const distance = floorWaypointFinder.distanceToWaypointCalculator(waypointNode, startNode, endNode);
  expect(distance).toBe(2);
});

it('Should give waypoint distance (case where start and end line is vertical)', () => {
  const waypointNode = { x: 0, y: 1, adjacency_list: [] };
  const startNode = { x: 2, y: 2, adjacency_list: [] };
  const endNode = { x: 2, y: 0, adjacency_list: [] };
  const distance = floorWaypointFinder.distanceToWaypointCalculator(waypointNode, startNode, endNode);
  expect(distance).toBe(2);
});
