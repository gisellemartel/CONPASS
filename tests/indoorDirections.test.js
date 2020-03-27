/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import dijkstraPathfinder from '../components/map/building/buildingWithFloors/dijkstraPathfinder';

beforeEach(() => {
  mockGraphFloor1 = {
    101: {
      x: 1,
      y: 1,
      adjacencyList: [
        '102'
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
      ]
    }
  };
  mockGraphFloor2 = {
    201: {
      x: 1,
      y: 1,
      adjacencyList: [

      ]
    }
  };
});

it('Should return the proper distance', () => {
  const distance = dijkstraPathfinder.nodeDistance('101', '102', mockGraphFloor1);
  expect(distance).toBe(1.118033988749895);
});

it('Should indicate new node is not closed list', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '103', predecessor: adjacencyNodePredecessor, distance: 2.24 };
  const closedList = [{ id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 }];
  const isAnalyzed = dijkstraPathfinder.isAnalyzed(closedList, adjacencyNode);
  expect(isAnalyzed).toBe(false);
});

it('Should indicate analyzed node is in closed list', () => {
  const adjacencyNodePredecessor = { id: '101', predecessor: undefined, distance: 0 };
  const adjacencyNode = { id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 };
  const closedList = [{ id: '102', predecessor: adjacencyNodePredecessor, distance: 1.12 },
    { id: '104', predecessor: adjacencyNodePredecessor, distance: 2.06 }];
  const isAnalyzed = dijkstraPathfinder.isAnalyzed(closedList, adjacencyNode);
  expect(isAnalyzed).toBe(true);
});
