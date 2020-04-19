/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

import distanceBetweenTwoNodes from './distanceBetweenTwoNodes';

const dijkstraPathfinder = {
  /**
   * The main function that streamlines the entirety of the Dijkstra algorithm. Comprises of the
   * following steps:
   * 1. Analyze a node (either by taking the start node or taking the node with the lowest distance
   * from openList).
   * 2. Observe unanalyzed adjacent nodes. Put them in openList if not already there, replace with
   * new instance if distance is shorter, do nothing otherwise.
   * 3. Put current node in closedList so that the algorithm does not perpetually analyze every
   * node.
   * 4. Once the end node is reached, form the shortest path by following the predecessor trail.
   *
   * @param {Array} waypoints - Set of start and finish points of directions for each relevant
   * floor.
   * @param {Array} adjacencyGraphs - All adjacency graphs pertaining to all relevant floors.
   */
  dijkstraPathfinder(waypoints, adjacencyGraphs) {
    let openList = []; // Candidates pending analysis for pathfinding. A priority queue based on graph distance.
    const closedList = []; // Already scanned candidates.
    let currentNode = { id: waypoints[0].start, predecessor: undefined, distance: 0 };
    do {
      const adjacencyNodes = adjacencyGraphs[0][currentNode.id].adjacencyList;
      for (let i = 0; i < adjacencyNodes.length; i += 1) {
        const adjacentNode = {
          id: adjacencyNodes[i],
          predecessor: currentNode,
          distance: currentNode.distance + distanceBetweenTwoNodes.nodeDistance(
            adjacencyGraphs[0][currentNode.id], adjacencyGraphs[0][adjacencyNodes[i]]
          )
        };
        if (!this.isAnalyzed(closedList, adjacentNode)) {
          openList = this.handleNodeAnalysis(openList, adjacentNode);
        }
      }
      closedList.push(currentNode);
      currentNode = openList.shift();
      // The algorithm ends when either the end node is detected or all nodes are analyzed.
    } while (currentNode !== undefined && closedList[closedList.length - 1].id !== waypoints[0].finish);
    return this.createShortestPath(closedList[closedList.length - 1], waypoints, adjacencyGraphs);
  },
  /**
   * Checks if a neighboring node has already been analyzed.
   * @param {Array} closedList - List of already analyzed nodes.
   * @param {Object} currentAdjacencyNode - Node of the current neighbor being considered.
   * floor.
   */
  isAnalyzed(closedList, currentAdjacencyNode) {
    for (let i = 0; i < closedList.length; i += 1) {
      if (closedList[i].id === currentAdjacencyNode.id) {
        return true;
      }
    }
    return false;
  },

  /**
   * Handles how neighbors being observed are inserted into the openList priority queue.
   * Priority is based on the accumulated distance from the start. If a neighbor is already
   * in openList, its data will be replaced if the distance is shorter than the previous
   * instance.
   * @param {Array} openList - List of nodes pending analysis.
   * @param {Object} currentAdjacencyNode - Node of the current neighbor being considered.
   */
  handleNodeAnalysis(openList, currentAdjacencyNode) {
    let nodeIndex = -1;
    // Check if node is already in openList.
    for (let i = 0; i < openList.length; i += 1) {
      if (openList[i].id === currentAdjacencyNode.id) {
        nodeIndex = i;
        break;
      }
    }
    // If node is in openList.
    if (nodeIndex >= 0) {
      // Dethrone distance and predecessor if new one is smaller.
      if (openList[nodeIndex].distance > currentAdjacencyNode.distance) {
        openList[nodeIndex].distance = currentAdjacencyNode.distance;
        openList[nodeIndex].predecessor = currentAdjacencyNode.predecessor;

        // Put distances back in sorted order.
        // Swap Notation found here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring
        for (let i = nodeIndex; i > 0; i -= 1) {
          if (openList[i].distance >= openList[i - 1].distance) {
            break;
          }
          [openList[i], openList[i - 1]] = [openList[i - 1], openList[i]];
        }
      }
      return openList;
    }
    // Insert new data in a fashion that keeps distances sorted.
    // If distance is the highest out of all nodes in openList, put at the end
    // of the list.
    nodeIndex = openList.length;
    for (let i = 0; i < openList.length; i += 1) {
      if (currentAdjacencyNode.distance <= openList[i].distance) {
        nodeIndex = i;
        break;
      }
    }
    openList.splice(nodeIndex, 0, currentAdjacencyNode);
    return openList;
  },
  /**
   * Looks at the end node and follows the trail formed by the node predecessors until the
   * start node is reached. The shortest path is then returned in a form that allows the
   * React SVG Polyline component to properly render the directions on the SVG map.
   * Prepares to perform the algorithm on the next floor if there is another floor on
   * standby for directions.
   * @param {Object} finishNode - The destination of the requested directions.
   * @param {Array} waypoints - Set of start and end points. Only relevant to remove the
   * waypoints already analyzed for the current floor.
   * @param {Array} adjacencyGraphs - The graph data structures representing each floor.
   * Needed to gather the x & y coordinates of each node in the shortest
   * path (since the polyline needs x & y coordinates), alongside removing the graph used
   * for the current floor.
   */
  createShortestPath(finishNode, waypoints, adjacencyGraphs) {
    let shortestPath = '';
    let currentNode = finishNode;
    do {
      shortestPath = `${adjacencyGraphs[0][currentNode.id].x * (360 / 1024)},`
      + `${adjacencyGraphs[0][currentNode.id].y * (360 / 1024)} ${shortestPath}`;
      currentNode = currentNode.predecessor;
    } while (currentNode !== undefined);
    if (waypoints.length > 1) {
      // Need to dispose of elements here (otherwise function will take what's thrown away as argument).
      waypoints.shift();
      adjacencyGraphs.shift();
      return [shortestPath].concat(this.dijkstraPathfinder(waypoints, adjacencyGraphs));
    }
    return [shortestPath];
  }
};

export default dijkstraPathfinder;
