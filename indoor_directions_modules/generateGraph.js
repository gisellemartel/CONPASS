import Hall1Graph from './buildings/H/Hall1FloorPlanCoordinates';
import Hall2Graph from './buildings/H/Hall2FloorPlanCoordinates';
import Hall3Graph from './buildings/H/Hall3FloorPlanCoordinates';
import Hall4Graph from './buildings/H/Hall4FloorPlanCoordinates';
import Hall5Graph from './buildings/H/Hall5FloorPlanCoordinates';
import Hall6Graph from './buildings/H/Hall6FloorPlanCoordinates';
import Hall7Graph from './buildings/H/Hall7FloorPlanCoordinates';
import Hall8Graph from './buildings/H/Hall8FloorPlanCoordinates';
import Hall9Graph from './buildings/H/Hall9FloorPlanCoordinates';
import Hall10Graph from './buildings/H/Hall10FloorPlanCoordinates';
import Hall11Graph from './buildings/H/Hall11FloorPlanCoordinates';
import Hall12Graph from './buildings/H/Hall12FloorPlanCoordinates';
import Hall13Graph from './buildings/H/Hall13FloorPlanCoordinates';
import Vl1Graph from './buildings/VL/Vl1FloorPlanCoordinates';
import Vl2Graph from './buildings/VL/Vl2FloorPlanCoordinates';

/**
 *
 * @param {*} buildingName - name of building to pull adjacency graph from.
 */
function generateGraph(buildingName) {
  switch (buildingName) {
    case 'H':
      return {
        1: Hall1Graph,
        2: Hall2Graph,
        3: Hall3Graph,
        4: Hall4Graph,
        5: Hall5Graph,
        6: Hall6Graph,
        7: Hall7Graph,
        8: Hall8Graph,
        9: Hall9Graph,
        10: Hall10Graph,
        11: Hall11Graph,
        12: Hall12Graph,
        13: Hall13Graph,
      };
    case 'VL':
      return {
        1: Vl1Graph,
        2: Vl2Graph
      };
    default:
      return [];
  }
}

export default generateGraph;
