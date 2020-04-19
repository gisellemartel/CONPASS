import hallBuildingRooms from '../indoor_directions_modules/buildings/H/HallBuildingRooms';
import vLBuildingRooms from '../indoor_directions_modules/buildings/VL/VLBuildingRooms';
import fetchBuildingRooms from '../indoor_directions_modules/fetchBuildingRooms';

it('Should return Building rooms', () => {
  const hallName = 'H';
  const vanierLibraryName = 'VL';
  const resultH = fetchBuildingRooms(hallName);
  const resultVL = fetchBuildingRooms(vanierLibraryName);

  expect(resultH).toEqual(hallBuildingRooms);
  expect(resultVL).toEqual(vLBuildingRooms);
});
