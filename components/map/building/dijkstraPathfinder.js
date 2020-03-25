const dijkstraPathfinder = {
  dijkstraPathfinder(startNode, finishNode, adjacencyGraph) {
    const openList = []; // Candidates to be scanned for pathfinding. A priority queue based on graph distance.
    const closedList = []; // Already scanned candidates. Not necessarily the nodes part of the shortest path.
    let currentNode = { id: startNode, predecessor: null, distance: 0 };
    do {
      const adjacencyNodes = adjacencyGraph[currentNode.id].adjacencyList;
      for (let j = 0; j < adjacencyNodes.length; j += 1) {
        const adjacentNode = { id: adjacencyNodes[j], predecessor: null, distance: 0 };
        // Open list has same functionality as closed list till distance and predecessor implemented.
        if (!this.isAnalyzed(closedList, adjacentNode) && !this.isAnalyzed(openList, adjacentNode)) {
          openList.push(adjacentNode);
        }
      }
      closedList.push(currentNode);
      currentNode = openList.shift();
    } while (currentNode !== undefined);
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
  createShortestPath() {
    // No implementation yet.
  }
};

export default dijkstraPathfinder;
