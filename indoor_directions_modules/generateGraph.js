import Hall8Graph from './buildings/H/Hall8FloorPlanCoordinates';
import Hall9Graph from './buildings/H/Hall9FloorPlanCoordinates';
/**
 *
 * @param {*} buildingName - name of building to pull adjacency graph from.
 */
function generateGraph(buildingName) {
  switch (buildingName) {
    case 'H':
      return {
        8: Hall8Graph,
        9: Hall9Graph
      };
    case 'VL':
      return {
        8: Hall8Graph,
        9: Hall9Graph
      };
    default:
      return [];
  }
}

export default generateGraph;
