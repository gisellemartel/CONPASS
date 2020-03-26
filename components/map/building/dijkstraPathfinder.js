const dijkstraPathfinder = {
  dijkstraPathfinder(startNode, finishNode, adjacencyGraph) {
    let openList = []; // Candidates to be scanned for pathfinding. A priority queue based on graph distance.
    const closedList = []; // Already scanned candidates. Not necessarily the nodes part of the shortest path.
    let currentNode = { id: startNode, predecessor: undefined, distance: 0 };
    do {
      const adjacencyNodes = adjacencyGraph[currentNode.id].adjacencyList;
      for (let i = 0; i < adjacencyNodes.length; i += 1) {
        const adjacentNode = {
          id: adjacencyNodes[i],
          predecessor: currentNode,
          distance: currentNode.distance + this.nodeDistance(currentNode.id, adjacencyNodes[i], adjacencyGraph)
        };
        // Open list has same functionality as closed list till distance and predecessor implemented.
        if (!this.isAnalyzed(closedList, adjacentNode)) {
          openList = this.handleNodeAnalysis(openList, adjacentNode);
        }
      }
      closedList.push(currentNode);
      currentNode = openList.shift();
    } while (currentNode !== undefined && closedList[closedList.length - 1].id !== finishNode);
    return this.createShortestPath(closedList[closedList.length - 1], adjacencyGraph);
  },
  isAnalyzed(closedList, currentAdjacencyNode) {
    let isAnalyzed = false;
    closedList.forEach((node) => {
      if (node.id === currentAdjacencyNode.id) {
        isAnalyzed = true;
      }
    });
    return isAnalyzed;
  },
  handleNodeAnalysis(openList, currentAdjacencyNode) {
    let nodeIndex = -1;
    for (let i = 0; i < openList.length; i += 1) {
      if (openList[i].id === currentAdjacencyNode.id) {
        nodeIndex = i;
        break;
      }
    }
    if (nodeIndex >= 0) {
      // Dethrone distance and predecessor if new one is smaller.
      if (openList[nodeIndex].distance > currentAdjacencyNode.distance) {
        openList[nodeIndex].distance = currentAdjacencyNode.distance;
        // Put distances back in sorted order.
        // Swap Notation found here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring
        for (let i = nodeIndex; i > 0; i -= 1) {
          if (openList[i].distance <= openList[i - 1].distance) {
            break;
          }
          [openList[i], openList[i - 1]] = [openList[i - 1], openList[i]];
        }
        for (let i = nodeIndex; i < nodeIndex; i += 1) {
          if (openList[i].distance >= openList[i + 1].distance) {
            break;
          }
          [openList[i], openList[i + 1]] = [openList[i + 1], openList[i]];
        }
      }
      return openList;
    }
    // Insert new data in a fashion that keeps distances sorted.
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
  createShortestPath(finishNode, adjacencyGraph) {
    let shortestPath = '';
    let currentNode = finishNode;
    do {
      shortestPath = `${adjacencyGraph[currentNode.id].x},${adjacencyGraph[currentNode.id].y} ${shortestPath}`;
      currentNode = currentNode.predecessor;
    } while (currentNode !== undefined);
    return shortestPath;
  },
  nodeDistance(startNodeId, endNodeId, adjacencyGraph) {
    const deltaXSquared = (adjacencyGraph[endNodeId].x - adjacencyGraph[startNodeId].x) ** 2;
    const deltaYSquared = (adjacencyGraph[endNodeId].y - adjacencyGraph[startNodeId].y) ** 2;
    return Math.sqrt(deltaXSquared + deltaYSquared);
  }
};

export default dijkstraPathfinder;
