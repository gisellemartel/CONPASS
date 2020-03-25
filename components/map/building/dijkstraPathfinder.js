const dijkstraPathfinder = {
  dijkstraPathfinder() {
    console.log('Dijkstra Pathfinder');
    this.isAnalyzed();
    return 'Test';
  },
  isAnalyzed() {
    console.log('Node is in closed list');
    this.createShortestPath();
  },
  createShortestPath() {
    console.log('Creating Shortest path');
  }
};

export default dijkstraPathfinder;
