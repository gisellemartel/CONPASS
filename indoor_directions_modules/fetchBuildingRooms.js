import HallBuildingRooms from './buildings/H/HallBuildingRooms';
import VLBuildingRooms from './buildings/VL/VLBuildingRooms';

/**
 *
 * @param {*} buildingName - name of building to pull room list from.
 */
function fetchBuildingRooms(buildingName) {
  switch (buildingName) {
    case 'H':
      return HallBuildingRooms;
    case 'VL':
      return VLBuildingRooms;
    default:
      return [];
  }
}

export default fetchBuildingRooms;
