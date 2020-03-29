/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import Location from '../components/location';
import getCurrentLocation from '../components/location/LocationServices';

jest.mock('../components/location/LocationServices');

let mockSgwBuildings;
let mockLoyolaBuildings;
let updateRegion;
beforeEach(() => {
  mockSgwBuildings = JSON.parse('{"sgwBuildings":[{"address": "1190 guy street", "name": "Grey Nuns", "xCoords": [-73.576535, -73.576396, -73.576743, -73.576747, -73.576747, -73.576791, -73.576832, -73.577005, -73.576673, -73.576625, -73.576497, -73.576543, -73.576245, -73.575783, -73.575641, -73.576094, -73.575996, -73.576178, -73.576283, -73.577057, -73.577348, -73.577412, -73.57756, -73.577339, -73.57702, -73.576409, -73.576748, -73.576875, -73.576822, -73.576944, -73.576999, -73.577156, -73.577267, -73.577153, -73.577132, -73.577082, -73.577128, -73.576963, -73.576935, -73.576853, -73.576938, -73.57696, -73.577212, -73.577402, -73.57751, -73.577314, -73.577379, -73.577198, -73.577141, -73.576963, -73.576977, -73.576972, -73.577032, -73.576965, -73.576923, -73.576875, -73.576868, -73.576584, -73.576577], "yCoords": [45.492593, 45.492731, 45.4929, 45.492925, 45.492925, 45.492949, 45.492941, 45.493025, 45.493363, 45.493341, 45.493471, 45.493493, 45.493793, 45.493569, 45.493712, 45.493934, 45.494035, 45.494121, 45.494018, 45.494391, 45.494094, 45.494124, 45.493975, 45.493869, 45.494192, 45.493896, 45.493551, 45.493613, 45.493668, 45.493726, 45.493672, 45.493747, 45.493634, 45.49358, 45.4936, 45.493576, 45.493529, 45.49345, 45.493478, 45.493438, 45.493353, 45.493362, 45.493108, 45.4932, 45.493088, 45.492992, 45.492925, 45.492839, 45.492895, 45.492809, 45.492793, 45.492772, 45.49271, 45.492677, 45.492677, 45.492727, 45.492746, 45.492609, 45.492614]}, {"address": "1538, Sherbrooke W", "name": "GS Building", "xCoords": [-73.581302, -73.581453, -73.581435, -73.580942, -73.580874, -73.580846, -73.580805, -73.581171, -73.581128], "yCoords": [45.496785, 45.496624, 45.496577, 45.496415, 45.496486, 45.496476, 45.496517, 45.496654, 45.49671]}, {"address": "1550 DeMaisonneuve W", "name": "GM_building", "xCoords": [-73.57881, -73.579146, -73.579108, -73.579089, -73.578746, -73.578435], "yCoords": [45.49613, 45.495781, 45.495762, 45.495779, 45.495618, 45.495947]}, {"address": "2030 Mackay Street", "name": "T Building", "xCoords": [-73.579339, -73.579499, -73.579413, -73.579349, -73.579117, -73.579004, -73.579163, -73.579179, -73.579263, -73.579253, -73.579335], "yCoords": [45.496812, 45.496651, 45.496609, 45.496666, 45.496545, 45.496644, 45.496729, 45.496716, 45.496761, 45.496763, 45.496808]}, {"address": "2080 Mackay Street", "name": "X Building", "xCoords": [-73.579736, -73.579573, -73.579672, -73.579835], "yCoords": [45.496991, 45.496913, 45.496814, 45.496889]}, {"address": "2110 Mackay Street", "name": "V Annex Building", "xCoords": [-73.580019, -73.579934, -73.579824, -73.57991], "yCoords": [45.496984, 45.496946, 45.497053, 45.497095]}, {"address": "1395 Rene Levesque W", "name": "VA Building", "xCoords": [-73.573791, -73.573546, -73.573801, -73.573485, -73.573769, -73.574306], "yCoords": [45.496193, 45.496075, 45.495811, 45.49567, 45.495398, 45.495671]}, {"address": "1250 Guy Street", "name": "Faubourg Building", "xCoords": [-73.578035, -73.577787, -73.577219, -73.57752], "yCoords": [45.494698, 45.494912, 45.494654, 45.494397]}, {"address": "1610 Ste-Catherine", "name": "FG Building", "xCoords": [-73.577788, -73.577223, -73.577523, -73.577618, -73.577685, -73.577757, -73.577795, -73.577765, -73.577989, -73.57802, -73.57813, -73.578119, -73.578344, -73.57837, -73.578698, -73.579067], "yCoords": [45.494908, 45.494663, 45.494397, 45.494442, 45.494387, 45.494425, 45.494395, 45.494373, 45.49418, 45.494195, 45.494105, 45.494095, 45.493907, 45.493916, 45.493622, 45.493822]}, {"address": "1410 Guy Street", "name": "TD Building", "xCoords": [-73.578501, -73.578428, -73.578077, -73.578178], "yCoords": [45.495126, 45.49519, 45.495038, 45.494944]}, {"address": "1400 DeMaisonneuve W", "name": "Webster Library Building", "xCoords": [-73.578062, -73.578638, -73.577702, -73.577063], "yCoords": [45.497284, 45.496698, 45.496227, 45.496862]}, {"address": "1455 DeMaisonneuve W", "name": "Henry F. Hall Building", "xCoords": [-73.578336, -73.579032, -73.579545, -73.578848], "yCoords": [45.497373, 45.49771, 45.497164, 45.496829]}, {"name": "Engineering, Computer Science \\n and Visual Arts Inte", "address": "1515 Ste-Catherine W", "xCoords": [-73.578763, -73.578497, -73.578074, -73.577709, -73.57725, -73.57753, -73.577556, -73.577639, -73.577609, -73.577697, -73.577744, -73.577878, -73.577914, -73.578021], "yCoords": [ 45.495591, 45.495866, 45.495668, 45.496048, 45.495831, 45.495539, 45.495551, 45.495462, 45.495448, 45.495356, 45.495354, 45.495238, 45.495234, 45.495247]}, {"address": "2160 Bishop Street", "name": "B Building", "xCoords": [-73.579455, -73.579373, -73.57956, -73.579636], "yCoords": [45.497922, 45.497884, 45.497705, 45.49774]}, {"address": "2149 Mackay Street", "name": "CI Building", "xCoords": [-73.579838, -73.580013, -73.579929, -73.579746], "yCoords": [45.49759, 45.497406, 45.497363, 45.497549]}, {"address": "1424 Bishop Street", "name": "LD Building", "xCoords": [-73.579475, -73.579554, -73.579783, -73.579733, -73.579607, -73.579574], "yCoords": [45.49689, 45.496931, 45.4967, 45.496676, 45.496802, 45.496788]}, {"address": "1665 Ste-Catherine W", "name": "CL Building", "xCoords": [-73.579278, -73.579656, -73.579311, -73.578934], "yCoords": [45.494473, 45.494166, 45.49397, 45.49426]}, {"address": "1450 Guy Street", "name": "John Molson Building", "xCoords": [-73.578733, -73.578521, -73.579216, -73.579384, -73.579115, -73.579173, -73.578818, -73.578784], "yCoords": [45.494996, 45.495187, 45.495534, 45.495363, 45.495216, 45.495164, 45.494999, 45.495033]}, {"address": "2140 Bishop Street", "name": "D Building", "xCoords": [-73.579413, -73.579302, -73.57923, -73.579341], "yCoords": [45.497741, 45.49785, 45.49781, 45.497707]}, {"address": "2070 Mackay Street", "name": "EN Building", "xCoords": [-73.579757, -73.579671, -73.579577, -73.579665], "yCoords": [45.496856, 45.496815, 45.496908, 45.496949]}, {"address": "2155 Guy Street ", "name": "ER Building", "xCoords": [-73.57966, -73.579606, -73.579735, -73.579785], "yCoords": [45.496824, 45.496803, 45.496676, 45.496701]}, {"address": "2060 Mackay Street ", "name": "FA Building", "xCoords": [-73.579585, -73.579489, -73.579406, -73.579501], "yCoords": [45.496776, 45.496872, 45.496831, 45.496735]}, {"address": "2135 Mackay Street ", "name": "M Building", "xCoords": [-73.57975, -73.579849, -73.57978, -73.579682], "yCoords": [45.497424, 45.497322, 45.497289, 45.497389]}, {"address": "2130 Bishop Street", "name": "MI Building", "xCoords": [-73.579229, -73.579342, -73.579403, -73.579353, -73.579285, -73.57926, -73.579166], "yCoords": [45.497809, 45.497706, 45.497647, 45.497623, 45.497693, 45.497681, 45.497778]}, {"address": "2170 Bishop Street", "name": "MU Building", "xCoords": [-73.579629, -73.579704, -73.579536, -73.579458], "yCoords": [45.497747, 45.497785, 45.497963, 45.497918]}, {"address": "2050 Mackay Street", "name": "R Building", "xCoords": [-73.579399, -73.579491, -73.579421, -73.579329], "yCoords": [45.496837, 45.496745, 45.49671, 45.496802]}, {"address": "2145 Mackay Street", "name": "S Building", "xCoords": [-73.579748, -73.579773, -73.579751, -73.579813, -73.579933, -73.579848], "yCoords": [45.497423, 45.497437, 45.497459, 45.49749, 45.497365, 45.497324]}, {"address": "1590 Doctor Penfield", "name": "Samuel Bronfman Building", "xCoords": [-73.586086, -73.586211, -73.586207, -73.585738, -73.585738, -73.585792, -73.585828, -73.586008], "yCoords": [45.496684, 45.496538, 45.496437, 45.496467, 45.496492, 45.496554, 45.496582, 45.496659]}]}').sgwBuildings;
  mockLoyolaBuildings = JSON.parse('{"loyolaBuildings": [{"address": "7141 Sherbrooke W", "name":"Vanier Library building","xCoords":[-73.639135,-73.638672,-73.638663,-73.638197,-73.638133,-73.637845,-73.638002,-73.638237,-73.638363,-73.638399,-73.638468,-73.638983,-73.638976,-73.63902,-73.638865,-73.638985,-73.639125,-73.639419],"yCoords":[45.459484,45.459303,45.459313,45.459133,45.459214,45.459102,45.458901,45.458865,45.458703,45.458717,45.45863,45.458829,45.458837,45.458854,45.45905,45.459095,45.45899,45.459107]},{"address": "7141 Sherbrooke W", "name":"Psychology Building","xCoords":[-73.640587,-73.640113,-73.640391,-73.640857],"yCoords":[45.459295,45.459114,45.45869,45.458845]},{"address": "7141 Sherbrooke West", "name":"F.C. Smith Building","xCoords":[-73.639603,-73.639759,-73.639037,-73.638849],"yCoords":[45.458808,45.458645,45.458359,45.458569]},{"address": "7141 Sherbrooke W", "name":"Richard J. Renaud Science Complex","xCoords":[-73.640829,-73.642004,-73.641846,-73.641926,-73.641412,-73.641038,-73.640922,-73.64086,-73.64147,-73.640654],"yCoords":[45.456983,45.457438,45.457641,45.457672,45.458328,45.458194,45.458341,45.458317,45.457525,45.457203]},{"address": "7141 Sherbrooke West", "name":"Central Building","xCoords":[-73.639827,-73.640125,-73.640067,-73.640007,-73.639907,-73.639944,-73.640012,-73.640795,-73.640749,-73.640813,-73.640852,-73.641007,-73.641075,-73.641375,-73.641159,-73.641129,-73.641034,-73.64105,-73.640807,-73.640879,-73.640756,-73.640774,-73.640709,-73.640686,-73.639904,-73.639946,-73.639881,-73.639766,-73.639822,-73.639766,-73.639468,-73.639526,-73.639616,-73.639689,-73.63958,-73.639624,-73.639753,-73.639836,-73.639766],"yCoords":[45.457798,45.457911,45.457985,45.457962,45.458107,45.458123,45.458079,45.458378,45.458438,45.458463,45.458414,45.458473,45.458382,45.458508,45.458806,45.458821,45.458784,45.458764,45.458684,45.458587,45.45854,45.458514,45.458488,45.458519,45.45822,45.458166,45.458142,45.458276,45.458297,45.458372,45.45826,45.458183,45.458201,45.458087,45.458039,45.457982,45.458023,45.457915,45.457876]},{"address": "7141 Sherbrooke West", "name":"Communication Studies and Journalism Building","xCoords":[-73.640391,-73.640658,-73.640639,-73.640718,-73.640503,-73.640631,-73.640484,-73.640291,-73.640314,-73.640044,-73.64015,-73.640027,-73.639821,-73.639761,-73.6398,-73.639885,-73.640016,-73.640074,-73.640075,-73.640206],"yCoords":[45.457175,45.457279,45.457303,45.457334,45.457596,45.45765,45.457831,45.457754,45.457726,45.457623,45.457485,45.457436,45.45748,45.457377,45.457282,45.45723,45.457211,45.457305,45.457361,45.45741]},{"address": "7141 Sherbrooke West", "name":"Centre for Structural and Functional Genomics","xCoords":[-73.640164,-73.640346,-73.640609,-73.640628,-73.640687,-73.64067,-73.64074,-73.640569,-73.640451,-73.640442],"yCoords":[45.457042,45.456799,45.456897,45.456872,45.456893,45.456919,45.456946,45.457175,45.457132,45.457144]},{"address": "7079 Terrebonne", "name":"TA Building","xCoords":[-73.640895,-73.640977,-73.64087,-73.640782],"yCoords":[45.460084,45.459978,45.459939,45.460041]},{"address": "7141 Sherbrooke West", "name":"Jesuit Residence","xCoords":[-73.643309,-73.643365,-73.643349,-73.6434,-73.643329,-73.643342,-73.643244,-73.643227,-73.643155,-73.643058],"yCoords":[45.458634,45.458566,45.45856,45.458495,45.458465,45.458448,45.458408,45.458426,45.458398,45.458538]},{"address": "3500 Bermore Avenue", "name":"BH Building","xCoords":[-73.639163,-73.639009,-73.639082,-73.639242],"yCoords":[45.459819,45.459756,45.459662,45.459723]},{"address": "7141, Sherbrooke W", "name":"HU Building","xCoords":[-73.641676,-73.641328,-73.642786,-73.64317],"yCoords":[45.458208,45.458676,45.459249,45.458791]},{ "address": "7141 Sherbrooke West", "name":"Hingston Hall Resisdence","xCoords":[-73.641372,-73.640894,-73.64109,-73.641587],"yCoords":[45.45971,45.459537,45.459255,45.459431]},{"address": "7200 Sherbrooke West", "name":"Perform Centre","xCoords":[-73.636772,-73.636984,-73.637842,-73.637629],"yCoords":[45.456945,45.456679,45.457015,45.457283]},{"address": "7141 Sherbrooke West", "name":"Physical Services Building","xCoords":[-73.640133,-73.640227,-73.6402,-73.640313,-73.640133,-73.640157,-73.639655,-73.63963,-73.639524,-73.639578,-73.639457,-73.639228,-73.639348,-73.639314],"yCoords":[45.459981,45.459863,45.459852,45.459705,45.459638,45.459608,45.459413,45.459443,45.459403,45.459332,45.459286,45.459577,45.459623,45.459665]},{"address": "7200 Sherbrooke West", "name":"Recreation and Athletics Complex","xCoords":[-73.637101,-73.637368,-73.638141,-73.638061,-73.638187,-73.638057,-73.637926,-73.637872,-73.637101],"yCoords":[45.456725,45.456389,45.456692,45.456794,45.456844,45.457008,45.456957,45.457026,45.456725]}]}').loyolaBuildings;
  updateRegion = jest.fn();
});

it('Should get all SGW buildings', async () => {
  const locationComponent = renderer.create(<Location />).getInstance();
  const sgwBuildings = locationComponent.formatPolygonsObjs('SGW');
  expect(sgwBuildings).toStrictEqual(mockSgwBuildings);
});

it('Should call getCurrentLocation in other file from this Location component', async () => {
  const locationComponent = renderer.create(<Location updateRegion />).getInstance();
  locationComponent.setState({
    region: {
      latitude: 0,
      longitude: 0,
    }
  });
  locationComponent.updateCurrentBuildingProp = jest.fn();
  getCurrentLocation.mockImplementationOnce((...args) => {
    return '';
  });
  await locationComponent.locateMe();
  // eslint-disable-next-line no-undef
  expect(getCurrentLocation).toHaveBeenCalled();
});

it('Should get all Loyola buildings', async () => {
  const locationComponent = renderer.create(<Location />).getInstance();
  const loyolaBuildings = locationComponent.formatPolygonsObjs('LOY');
  expect(loyolaBuildings).toStrictEqual(mockLoyolaBuildings);
});

it('Should get no buildings with invalid argument', async () => {
  const locationComponent = renderer.create(<Location />).getInstance();
  const invalidBuildings = locationComponent.formatPolygonsObjs('UgaBuga');
  expect(invalidBuildings).toStrictEqual([]);
});

it('Polygon should define points close to edges as inside', async () => {
  const locationComponent = renderer.create(<Location />).getInstance();
  const bottomLeftPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 0.1, 0.1);
  const topRightPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 0.9, 0.9);
  expect(bottomLeftPartition).toBe(false);
  expect(topRightPartition).toBe(true);
});

it('Polygon should define points outside of edges as outside', async () => {
  const locationComponent = renderer.create(<Location />).getInstance();
  const leftPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], -0.1, 0.1);
  const rightPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 1.1, 0.9);
  const bottomPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 0.1, -0.1);
  const topPartition = locationComponent.isInPolygon(4, [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 0.9, 1.1);
  expect(leftPartition).toBe(false);
  expect(rightPartition).toBe(false);
  expect(bottomPartition).toBe(false);
  expect(topPartition).toBe(false);
});

/*
it('Should return 1400 DeMaisonneuve W as the address', () => {
  const withinBuildingComponent = renderer.create(<WithinBuilding updateCurrentBuildingCallBack={updateC} />).getInstance();
  withinBuildingComponent.state.campusDisplayName = 'SGW';
  withinBuildingComponent.state.buildingDisplayName = 'Webster Library Building';
  const expectedAddress = withinBuildingComponent.updateCurrentBuildingProp();
  expect(expectedAddress).toBe('1400 DeMaisonneuve W');
});

it('Should return an empty String as the address', () => {
  const withinBuildingComponent = renderer.create(<WithinBuilding />).getInstance();
  withinBuildingComponent.state.campusDisplayName = 'SGW';
  withinBuildingComponent.state.buildingDisplayName = '';
  const expectedAddress = withinBuildingComponent.updateCurrentBuildingProp();
  expect(expectedAddress).toBe('');
});
*/
