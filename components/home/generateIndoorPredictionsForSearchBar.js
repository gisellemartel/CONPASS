/* eslint-disable no-restricted-globals */
import fetchBuildingRooms from '../../indoor_directions_modules/fetchBuildingRooms';

const generateIndoorPredictionsForSearchBar = () => {
  const hallData = fetchBuildingRooms('H');
  const vlData = fetchBuildingRooms('VL');
  const indoorRoomsList = [];

  const hallRooms = Object.keys(hallData);
  const vlRooms = Object.keys(vlData);

  hallRooms.forEach((floor) => {
    hallData[floor].forEach((room) => {
      let roomString;
      const isNumeric = !isNaN(room);
      if (!isNumeric) {
        roomString = `H-${floor} ${room.toString().replace('_', ' ')}`;
      } else {
        roomString = `H-${room.toString()}`;
      }

      const currentAvailableRoom = {
        id: roomString,
        description: roomString,
        place_id: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
        dijkstraId: room.toString(),
        building: 'H',
        origin: 'north_exit',
        coordinates: {
          latitude: 45.497092,
          longitude: -73.578800,
        },
        floor,
      };
      indoorRoomsList.push(currentAvailableRoom);
    });
  });

  vlRooms.forEach((floor) => {
    vlData[floor].forEach((room) => {
      let roomString;
      const isNumeric = !isNaN(room);
      if (!isNumeric) {
        roomString = `VL-${floor} ${room.toString().replace('_', ' ')}`;
      } else {
        roomString = `VL-${room.toString()}`;
      }
      const currentAvailableRoom = {
        id: roomString,
        description: roomString,
        place_id: 'ChIJDbfcNjIXyUwRcocn3RuPPiY',
        dijkstraId: room.toString(),
        building: 'VL',
        origin: 'exit',
        coordinates: { latitude: 45.459026, longitude: -73.638606, },
        floor,
      };
      indoorRoomsList.push(currentAvailableRoom);
    });
  });
  return indoorRoomsList;
};

export default generateIndoorPredictionsForSearchBar;
