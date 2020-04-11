// each building is made of many polygon, each polygon will have an array of coordinates

const buildings = [
  /* LOYOLA CAMPUS BUILDINGS*/
  {
    campus: 'LOY',
    building: 'VL',
    buildingName: 'Vanier Library building',
    accessiblity: true,
    address: '7141 Sherbrooke W',
    latitude: 45.459026,
    longitude: -73.638606,
    image: [{ image: require('./images/vlBuilding.png') }],
    polygon: {
      name: 'Vanier Library building',
      coordinates:
              [
                { latitude: 45.459484, longitude: -73.639135 },
                { latitude: 45.459303, longitude: -73.638672 },
                { latitude: 45.459313, longitude: -73.638663 },
                { latitude: 45.459133, longitude: -73.638197 },
                { latitude: 45.459214, longitude: -73.638133 },
                { latitude: 45.459102, longitude: -73.637845 },
                { latitude: 45.458901, longitude: -73.638002 },
                { latitude: 45.458865, longitude: -73.638237 },
                { latitude: 45.458703, longitude: -73.638363 },
                { latitude: 45.458717, longitude: -73.638399 },
                { latitude: 45.458630, longitude: -73.638468 },
                { latitude: 45.458829, longitude: -73.638983 },
                { latitude: 45.458837, longitude: -73.638976 },
                { latitude: 45.458854, longitude: -73.639020 },
                { latitude: 45.459050, longitude: -73.638865 },
                { latitude: 45.459095, longitude: -73.638985 },
                { latitude: 45.458990, longitude: -73.639125 },
                { latitude: 45.459107, longitude: -73.639419 }
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'PY',
    buildingName: 'Psychology Building',
    address: '7141 Sherbrooke W',
    latitude: 45.458938,
    longitude: -73.640467,
    image: [{ image: require('./images/pyBuilding.jpg') }],
    polygon: {
      name: 'Psychology Building',
      coordinates:
              [
                { latitude: 45.459295, longitude: -73.640587 },
                { latitude: 45.459114, longitude: -73.640113 },
                { latitude: 45.458690, longitude: -73.640391 },
                { latitude: 45.458845, longitude: -73.640857 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'FC',
    buildingName: 'F.C. Smith Building',
    address: '7141 Sherbrooke West',
    latitude: 45.458493,
    longitude: -73.639287,
    image: [{ image: require('./images/fcBuilding.jpg') }],
    polygon: {
      name: 'F.C. Smith Building',
      coordinates:
              [
                { latitude: 45.458808, longitude: -73.639603 },
                { latitude: 45.458645, longitude: -73.639759 },
                { latitude: 45.458359, longitude: -73.639037 },
                { latitude: 45.458569, longitude: -73.638849 }
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'SP',
    buildingName: 'Richard J. Renaud Science Complex',
    address: '7141 Sherbrooke W',
    latitude: 45.457881,
    longitude: -73.641565,
    image: [{ image: require('./images/spBuilding.jpg') }],
    polygon: {
      name: 'Richard J. Renaud Science Complex',
      coordinates:
              [
                { latitude: 45.456983, longitude: -73.640829 },
                { latitude: 45.457438, longitude: -73.642004 },
                { latitude: 45.457641, longitude: -73.641846 },
                { latitude: 45.457672, longitude: -73.641926 },
                { latitude: 45.458328, longitude: -73.641412 },
                { latitude: 45.458194, longitude: -73.641038 },
                { latitude: 45.458341, longitude: -73.640922 },
                { latitude: 45.458317, longitude: -73.640860 },
                { latitude: 45.457525, longitude: -73.641470 },
                { latitude: 45.457203, longitude: -73.640654 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'CC',
    buildingName: 'Central Building',
    address: '7141 Sherbrooke West',
    latitude: 45.458204,
    longitude: -73.640300,
    image: [{ image: require('./images/centralBuilding.jpg') }],
    polygon: {
      name: 'Central Building',
      coordinates:
              [
                { latitude: 45.457798, longitude: -73.639827 },
                { latitude: 45.457911, longitude: -73.640125 },
                { latitude: 45.457985, longitude: -73.640067 },
                { latitude: 45.457962, longitude: -73.640007 },
                { latitude: 45.458107, longitude: -73.639907 },
                { latitude: 45.458123, longitude: -73.639944 },
                { latitude: 45.458079, longitude: -73.640012 },
                { latitude: 45.458378, longitude: -73.640795 },
                { latitude: 45.458438, longitude: -73.640749 },
                { latitude: 45.458463, longitude: -73.640813 },
                { latitude: 45.458414, longitude: -73.640852 },
                { latitude: 45.458473, longitude: -73.641007 },
                { latitude: 45.458382, longitude: -73.641075 },
                { latitude: 45.458508, longitude: -73.641375 },
                { latitude: 45.458806, longitude: -73.641159 },
                { latitude: 45.458821, longitude: -73.641129 },
                { latitude: 45.458784, longitude: -73.641034 },
                { latitude: 45.458764, longitude: -73.641050 },
                { latitude: 45.458684, longitude: -73.640807 },
                { latitude: 45.458587, longitude: -73.640879 },
                { latitude: 45.458540, longitude: -73.640756 },
                { latitude: 45.458514, longitude: -73.640774 },
                { latitude: 45.458488, longitude: -73.640709 },
                { latitude: 45.458519, longitude: -73.640686 },
                { latitude: 45.458220, longitude: -73.639904 },
                { latitude: 45.458166, longitude: -73.639946 },
                { latitude: 45.458142, longitude: -73.639881 },
                { latitude: 45.458276, longitude: -73.639766 },
                { latitude: 45.458297, longitude: -73.639822 },
                { latitude: 45.458372, longitude: -73.639766 },
                { latitude: 45.458260, longitude: -73.639468 },
                { latitude: 45.458183, longitude: -73.639526 },
                { latitude: 45.458201, longitude: -73.639616 },
                { latitude: 45.458087, longitude: -73.639689 },
                { latitude: 45.458039, longitude: -73.639580 },
                { latitude: 45.457982, longitude: -73.639624 },
                { latitude: 45.458023, longitude: -73.639753 },
                { latitude: 45.457915, longitude: -73.639836 },
                { latitude: 45.457876, longitude: -73.639766 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'CJ',
    buildingName: 'Communication Studies and Journalism Building',
    placesToGo: [
      {
        name: 'CJ Café',
        id: '1',
        placeID: 'ChIJJ4gBMS4XyUwR5Cxm6Yq7mhc',
        opening: ['8:00 am', '9:30 pm'],
        image: require('./images/CjCafe.jpg')
      }
    ],
    address: '7141 Sherbrooke West',
    latitude: 45.457478,
    longitude: -73.640354,
    image: [{ image: require('./images/cjBuilding.jpg') }],
    polygon: {
      name: 'Communications & Journalism building',
      coordinates:
              [
                { latitude: 45.457175, longitude: -73.640391 },
                { latitude: 45.457279, longitude: -73.640658 },
                { latitude: 45.457303, longitude: -73.640639 },
                { latitude: 45.457334, longitude: -73.640718 },
                { latitude: 45.457596, longitude: -73.640503 },
                { latitude: 45.457650, longitude: -73.640631 },
                { latitude: 45.457831, longitude: -73.640484 },
                { latitude: 45.457754, longitude: -73.640291 },
                { latitude: 45.457726, longitude: -73.640314 },
                { latitude: 45.457623, longitude: -73.640044 },
                { latitude: 45.457485, longitude: -73.640150 },
                { latitude: 45.457436, longitude: -73.640027 },
                { latitude: 45.457480, longitude: -73.639821 },
                { latitude: 45.457377, longitude: -73.639761 },
                { latitude: 45.457282, longitude: -73.639800 },
                { latitude: 45.457230, longitude: -73.639885 },
                { latitude: 45.457211, longitude: -73.640016 },
                { latitude: 45.457305, longitude: -73.640074 },
                { latitude: 45.457361, longitude: -73.640075 },
                { latitude: 45.457410, longitude: -73.640206 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'GE',
    buildingName: 'Centre for Structural and Functional Genomics',
    address: '7141 Sherbrooke West',
    latitude: 45.457017,
    longitude: -73.640432,
    image: [{ image: require('./images/geBuilding.jpg') }],
    polygon: {
      name: 'GE building',
      coordinates:
              [
                { latitude: 45.457042, longitude: -73.640164 },
                { latitude: 45.456799, longitude: -73.640346 },
                { latitude: 45.456897, longitude: -73.640609 },
                { latitude: 45.456872, longitude: -73.640628 },
                { latitude: 45.456893, longitude: -73.640687 },
                { latitude: 45.456919, longitude: -73.640670 },
                { latitude: 45.456946, longitude: -73.640740 },
                { latitude: 45.457175, longitude: -73.640569 },
                { latitude: 45.457132, longitude: -73.640451 },
                { latitude: 45.457144, longitude: -73.640442 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'TA',
    buildingName: 'TA Building',
    address: '7079 Terrebonne',
    latitude: 45.459992,
    longitude: -73.640897,
    image: [{ image: require('./images/taBuilding.jpg') }],
    polygon: {
      name: 'Terrebonne Building',
      coordinates:
              [
                { latitude: 45.460084, longitude: -73.640895 },
                { latitude: 45.459978, longitude: -73.640977 },
                { latitude: 45.459939, longitude: -73.640870 },
                { latitude: 45.460041, longitude: -73.640782 },
              ]

    }
  },
  {
    campus: 'LOY',
    building: 'JR',
    buildingName: 'Jesuit Residence',
    address: '7141 Sherbrooke West',
    latitude: 45.458432,
    longitude: -73.643235,
    image: [{ image: require('./images/jrBuilding.jpg') }],
    polygon: {
      name: 'Jesuit Residence',
      coordinates:
              [
                { latitude: 45.458634, longitude: -73.643309 },
                { latitude: 45.458566, longitude: -73.643365 },
                { latitude: 45.458560, longitude: -73.643349 },
                { latitude: 45.458495, longitude: -73.643400 },
                { latitude: 45.458465, longitude: -73.643329 },
                { latitude: 45.458448, longitude: -73.643342 },
                { latitude: 45.458408, longitude: -73.643244 },
                { latitude: 45.458426, longitude: -73.643227 },
                { latitude: 45.458398, longitude: -73.643155 },
                { latitude: 45.458538, longitude: -73.643058 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'BH',
    buildingName: 'BH Building',
    address: '3500 Bermore Avenue',
    latitude: 45.459819,
    longitude: -73.639152,
    image: [{ image: require('./images/bhBuilding.jpg') }],
    polygon: {
      name: 'BH Building',
      coordinates:
              [
                { latitude: 45.459819, longitude: -73.639163 },
                { latitude: 45.459756, longitude: -73.639009 },
                { latitude: 45.459662, longitude: -73.639082 },
                { latitude: 45.459723, longitude: -73.639242 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'HU',
    buildingName: 'HU Building',
    address: '7141, Sherbrooke W',
    latitude: 45.458513,
    longitude: -73.641921,
    image: [{ image: require('./images/huBuilding.jpg') }],
    polygon: {
      name: 'HU Building-Applied Science Hub',
      coordinates:
              [
                { latitude: 45.458208, longitude: -73.641676 },
                { latitude: 45.458676, longitude: -73.641328 },
                { latitude: 45.459249, longitude: -73.642786 },
                { latitude: 45.458791, longitude: -73.643170 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'HB',
    buildingName: 'Hingston Hall Resisdence',
    placesToGo: [{
      name: 'Hingston Café',
      id: '2',
      placeID: 'ChIJJ4gBMS4XyUwR5Cxm6Yq7mhc',
      opening: ['8:00 am', '9:30 pm'],
      image: require('./images/HingstonCafe.jpg')
    }
    ],
    address: '7141 Sherbrooke West',
    latitude: 45.459356,
    longitude: -73.641270,
    image: [{ image: require('./images/hbBuilding.jpg') }],
    polygon: {
      name: 'Hingston Hall Resisdence',
      coordinates:
              [
                { latitude: 45.459710, longitude: -73.641372 },
                { latitude: 45.459537, longitude: -73.640894 },
                { latitude: 45.459255, longitude: -73.641090 },
                { latitude: 45.459431, longitude: -73.641587 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'PC',
    buildingName: 'Perform Centre',
    address: '7200 Sherbrooke West',
    latitude: 45.457088,
    longitude: -73.637683,
    image: [{ image: require('./images/pcBuilding.jpeg') }],
    polygon: {
      name: 'Perform Centre',
      coordinates:
              [
                { latitude: 45.456945, longitude: -73.636772 },
                { latitude: 45.456679, longitude: -73.636984 },
                { latitude: 45.457015, longitude: -73.637842 },
                { latitude: 45.457283, longitude: -73.637629 },
              ]

    }
  },
  {
    campus: 'LOY',
    building: 'PS',
    buildingName: 'Physical Services Building',
    address: '7141 Sherbrooke West',
    latitude: 45.459636,
    longitude: -73.639758,
    image: [{ image: require('./images/psBuilding.jpg') }],
    polygon: {
      name: 'Perform Centre',
      coordinates:
              [
                { latitude: 45.459981, longitude: -73.640133 },
                { latitude: 45.459863, longitude: -73.640227 },
                { latitude: 45.459852, longitude: -73.640200 },
                { latitude: 45.459705, longitude: -73.640313 },
                { latitude: 45.459638, longitude: -73.640133 },
                { latitude: 45.459608, longitude: -73.640157 },
                { latitude: 45.459413, longitude: -73.639655 },
                { latitude: 45.459443, longitude: -73.639630 },
                { latitude: 45.459403, longitude: -73.639524 },
                { latitude: 45.459332, longitude: -73.639578 },
                { latitude: 45.459286, longitude: -73.639457 },
                { latitude: 45.459577, longitude: -73.639228 },
                { latitude: 45.459623, longitude: -73.639348 },
                { latitude: 45.459665, longitude: -73.639314 },
              ]
    }
  },
  {
    campus: 'LOY',
    building: 'RA',
    buildingName: 'Recreation and Athletics Complex',
    address: '7200 Sherbrooke West',
    latitude: 45.456774,
    longitude: -73.637610,
    image: [{ image: require('./images/raBuilding.jpg') }],
    polygon: {
      name: 'RA Building',
      coordinates:
              [
                { latitude: 45.456725, longitude: -73.637101 },
                { latitude: 45.456389, longitude: -73.637368 },
                { latitude: 45.456692, longitude: -73.638141 },
                { latitude: 45.456794, longitude: -73.638061 },
                { latitude: 45.456844, longitude: -73.638187 },
                { latitude: 45.457008, longitude: -73.638057 },
                { latitude: 45.456957, longitude: -73.637926 },
                { latitude: 45.457026, longitude: -73.637872 },
                { latitude: 45.456725, longitude: -73.637101 },
              ]
    }
  },
  /* SGW Campus Buildings */
  {
    campus: 'SGW',
    accessiblity: true,
    building: 'GN',
    buildingName: 'Grey Nuns',
    address: '1190 guy street',
    placesToGo: [{
      name: 'Grey Nuns Dining Hall',
      id: '3',
      placeID: 'ChIJV-mGQ2kayUwRT2vvO_XjKtE',
      opening: ['8:00 am', '9:30 pm'],
      image: require('./images/greyNunsDine.jpg')
    }
    ],
    latitude: '45.493484',
    longtitude: '-73.576748',
    image: [{ image: require('./images/GreyNuns.jpg') }],
    polygon: {
      name: 'Grey Nuns',
      coordinates:
              [
                { latitude: 45.492593, longitude: -73.576535 },
                { latitude: 45.492731, longitude: -73.576396 },
                { latitude: 45.492900, longitude: -73.576743 },
                { latitude: 45.492925, longitude: -73.576747 },
                { latitude: 45.492925, longitude: -73.576747 },
                { latitude: 45.492949, longitude: -73.576791 },
                { latitude: 45.492941, longitude: -73.576832 },
                { latitude: 45.493025, longitude: -73.577005 },
                { latitude: 45.493363, longitude: -73.576673 },
                { latitude: 45.493341, longitude: -73.576625 },
                { latitude: 45.493471, longitude: -73.576497 },
                { latitude: 45.493493, longitude: -73.576543 },
                { latitude: 45.493793, longitude: -73.576245 },
                { latitude: 45.493569, longitude: -73.575783 },
                { latitude: 45.493712, longitude: -73.575641 },
                { latitude: 45.493934, longitude: -73.576094 },
                { latitude: 45.494035, longitude: -73.575996 },
                { latitude: 45.494121, longitude: -73.576178 },
                { latitude: 45.494018, longitude: -73.576283 },
                { latitude: 45.494391, longitude: -73.577057 },
                { latitude: 45.494094, longitude: -73.577348 },
                { latitude: 45.494124, longitude: -73.577412 },
                { latitude: 45.493975, longitude: -73.577560 },
                { latitude: 45.493869, longitude: -73.577339 },
                { latitude: 45.494192, longitude: -73.577020 },
                { latitude: 45.493896, longitude: -73.576409 },
                { latitude: 45.493551, longitude: -73.576748 },
                { latitude: 45.493613, longitude: -73.576875 },
                { latitude: 45.493668, longitude: -73.576822 },
                { latitude: 45.493726, longitude: -73.576944 },
                { latitude: 45.493672, longitude: -73.576999 },
                { latitude: 45.493747, longitude: -73.577156 },
                { latitude: 45.493634, longitude: -73.577267 },
                { latitude: 45.493580, longitude: -73.577153 },
                { latitude: 45.493600, longitude: -73.577132 },
                { latitude: 45.493576, longitude: -73.577082 },
                { latitude: 45.493529, longitude: -73.577128 },
                { latitude: 45.493450, longitude: -73.576963 },
                { latitude: 45.493478, longitude: -73.576935 },
                { latitude: 45.493438, longitude: -73.576853 },
                { latitude: 45.493353, longitude: -73.576938 },
                { latitude: 45.493362, longitude: -73.576960 },
                { latitude: 45.493108, longitude: -73.577212 },
                { latitude: 45.493200, longitude: -73.577402 },
                { latitude: 45.493088, longitude: -73.577510 },
                { latitude: 45.492992, longitude: -73.577314 },
                { latitude: 45.492925, longitude: -73.577379 },
                { latitude: 45.492839, longitude: -73.577198 },
                { latitude: 45.492895, longitude: -73.577141 },
                { latitude: 45.492809, longitude: -73.576963 },
                { latitude: 45.492793, longitude: -73.576977 },
                { latitude: 45.492772, longitude: -73.576972 },
                { latitude: 45.492710, longitude: -73.577032 },
                { latitude: 45.492677, longitude: -73.576965 },
                { latitude: 45.492677, longitude: -73.576923 },
                { latitude: 45.492727, longitude: -73.576875 },
                { latitude: 45.492746, longitude: -73.576868 },
                { latitude: 45.492609, longitude: -73.576584 },
                { latitude: 45.492614, longitude: -73.576577 }

              ]
    }
  },
  {
    campus: 'SGW',
    building: 'GS',
    buildingName: 'GS Building',
    address: '1538, Sherbrooke W',
    latitude: 45.496673,
    longtitude: -73.581409,
    image: [{ image: require('./images/gsBuilding.jpg') }],
    polygon: {
      name: 'Guy-Sherbrooke Building',
      coordinates:
      [
        { latitude: 45.496785, longitude: -73.581302 },
        { latitude: 45.496624, longitude: -73.581453 },
        { latitude: 45.496577, longitude: -73.581435 },
        { latitude: 45.496415, longitude: -73.580942 },
        { latitude: 45.496486, longitude: -73.580874 },
        { latitude: 45.496476, longitude: -73.580846 },
        { latitude: 45.496517, longitude: -73.580805 },
        { latitude: 45.496654, longitude: -73.581171 },
        { latitude: 45.496710, longitude: -73.581128 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'GM',
    buildingName: 'GM_building',
    address: '1550 DeMaisonneuve W',
    latitude: 45.495983,
    longtitude: -73.578824,
    image: [{ image: require('./images/gmBuilding.jpg') }],
    polygon: {
      name: 'GM_building',
      coordinates:
              [
                { latitude: 45.496130, longitude: -73.578810 },
                { latitude: 45.495781, longitude: -73.579146 },
                { latitude: 45.495762, longitude: -73.579108 },
                { latitude: 45.495779, longitude: -73.579089 },
                { latitude: 45.495618, longitude: -73.578746 },
                { latitude: 45.495947, longitude: -73.578435 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'T',
    buildingName: 'T Building',
    address: '2030 Mackay Street',
    latitude: 45.496710,
    longtitude: -73.579270,
    image: [{ image: require('./images/tBuilding.png') }],
    polygon: {
      name: 'T Building',
      coordinates:
      [
        { latitude: 45.496812, longitude: -73.579339 },
        { latitude: 45.496651, longitude: -73.579499 },
        { latitude: 45.496609, longitude: -73.579413 },
        { latitude: 45.496666, longitude: -73.579349 },
        { latitude: 45.496545, longitude: -73.579117 },
        { latitude: 45.496644, longitude: -73.579004 },
        { latitude: 45.496729, longitude: -73.579163 },
        { latitude: 45.496716, longitude: -73.579179 },
        { latitude: 45.496761, longitude: -73.579263 },
        { latitude: 45.496763, longitude: -73.579253 },
        { latitude: 45.496808, longitude: -73.579335 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'X',
    buildingName: 'X Building',
    address: '2080 Mackay Street',
    latitude: 45.496940,
    longtitude: -73.579593,
    image: [{ image: require('./images/xBuilding.png') }],
    polygon: {
      name: 'X Building',
      coordinates:
      [
        { latitude: 45.496991, longitude: -73.579736 },
        { latitude: 45.496913, longitude: -73.579573 },
        { latitude: 45.496814, longitude: -73.579672 },
        { latitude: 45.496889, longitude: -73.579835 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'V',
    buildingName: 'V Annex Building',
    address: '2110 Mackay Street',
    latitude: 45.497101,
    longtitude: -73.579907,
    image: [{ image: require('./images/vBuilding.png') }],
    polygon: {
      name: 'V Annex Building',
      coordinates:
      [
        { latitude: 45.496984, longitude: -73.580019 },
        { latitude: 45.496946, longitude: -73.579934 },
        { latitude: 45.497053, longitude: -73.579824 },
        { latitude: 45.497095, longitude: -73.579910 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'VA',
    buildingName: 'VA Building',
    address: '1395 Rene Levesque W',
    latitude: 45.495543,
    longtitude: -73.573795,
    image: [{ image: require('./images/vaBuilding.jpg') }],
    polygon: {
      name: 'VA Building',
      coordinates:
      [
        { latitude: 45.496193, longitude: -73.573791 },
        { latitude: 45.496075, longitude: -73.573546 },
        { latitude: 45.495811, longitude: -73.573801 },
        { latitude: 45.495670, longitude: -73.573485 },
        { latitude: 45.495398, longitude: -73.573769 },
        { latitude: 45.495671, longitude: -73.574306 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'FB',
    buildingName: 'Faubourg Building',
    address: '1250 Guy Street',
    latitude: 45.494666,
    longitude: -73.577603,
    image: [{ image: require('./images/fbBuilding.jpg') }],
    polygon: {
      name: 'FB_building',
      coordinates:
              [
                { latitude: 45.494698, longitude: -73.578035 },
                { latitude: 45.494912, longitude: -73.577787 },
                { latitude: 45.494654, longitude: -73.577219 },
                { latitude: 45.494397, longitude: -73.577520 }
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'FG',
    buildingName: 'FG Building',
    address: '1610 Ste-Catherine',
    latitude: 45.494381,
    longitude: -73.578425,
    image: [{ image: require('./images/fgBuilding.jpg') }],
    polygon: {
      name: 'FG building',
      coordinates:
      [
        { latitude: 45.494908, longitude: -73.577788 },
        { latitude: 45.494663, longitude: -73.577223 },
        { latitude: 45.494397, longitude: -73.577523 },
        { latitude: 45.494442, longitude: -73.577618 },
        { latitude: 45.494387, longitude: -73.577685 },
        { latitude: 45.494425, longitude: -73.577757 },
        { latitude: 45.494395, longitude: -73.577795 },
        { latitude: 45.494373, longitude: -73.577765 },
        { latitude: 45.494180, longitude: -73.577989 },
        { latitude: 45.494195, longitude: -73.578020 },
        { latitude: 45.494105, longitude: -73.578130 },
        { latitude: 45.494095, longitude: -73.578119 },
        { latitude: 45.493907, longitude: -73.578344 },
        { latitude: 45.493916, longitude: -73.578370 },
        { latitude: 45.493622, longitude: -73.578698 },
        { latitude: 45.493822, longitude: -73.579067 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'TD',
    buildingName: 'TD Building',
    address: '1410 Guy Street',
    latitude: 45.495103,
    longtitude: -73.578375,
    image: [{ image: require('./images/tdBuilding.jpg') }],
    polygon: {
      name: 'TD Building',
      coordinates:
      [
        { latitude: 45.495126, longitude: -73.578501 },
        { latitude: 45.495190, longitude: -73.578428 },
        { latitude: 45.495038, longitude: -73.578077 },
        { latitude: 45.494944, longitude: -73.578178 },
      ]
    }
  },
  {
    campus: 'SGW',
    building: 'LB',
    buildingName: 'Webster Library Building',
    accessiblity: true,
    placesToGo: [{
      name: 'LB Café',
      id: '4',
      placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns',
      opening: ['8:00 am', '9:30 pm'],
      image: require('./images/LbCafe.jpeg')
    },
    {
      name: 'Starbucks', id: '5', placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns', opening: ['8:00 am', '9:30 pm'], image: require('./images/starbucks.jpg')
    },
    {
      name: 'Tim Hortons', id: '6', placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns', opening: ['8:00 am', '9:30 pm'], image: require('./images/TimHortons.jpg')
    }
    ],
    address: '1400 DeMaisonneuve W',
    latitude: 45.497050,
    longtitude: -73.578009,
    tunnelAccessiblity: true,
    image: [{ image: require('./images/lbBuilding.jpg') }],
    polygon: {
      name: 'Webster Library Building',
      coordinates:
              [
                { latitude: 45.497284, longitude: -73.578062 },
                { latitude: 45.496698, longitude: -73.578638 },
                { latitude: 45.496227, longitude: -73.577702 },
                { latitude: 45.496862, longitude: -73.577063 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'H',
    buildingName: 'Henry F. Hall Building',
    accessiblity: true,
    placesToGo: [{
      name: 'Hall 4 Café - The Green Beet',
      id: '7',
      placeID: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
      opening: ['8:00 am', '9:30 pm'],
      image: require('./images/hallCafe.jpg')
    },
    {
      name: 'Hive Café Solidarity Cooperative',
      id: '7.1',
      placeID: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
      opening: ['8:00 am', '9:30 pm'],
      image: require('./images/hiveCafe.jpg')
    }
    ],
    address: '1455 DeMaisonneuve W',
    latitude: 45.497092,
    longtitude: -73.578800,
    image: [{ image: require('./images/HBuilding.jpg') }],
    tunnelAccessiblity: true,
    polygon: {
      name: 'Henry F. Hall Building',
      coordinates:
              [
                { latitude: 45.497373, longitude: -73.578336 },
                { latitude: 45.497710, longitude: -73.579032 },
                { latitude: 45.497164, longitude: -73.579545 },
                { latitude: 45.496829, longitude: -73.578848 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'EV',
    buildingName: 'Engineering, Computer Science \n and Visual Arts Inte',
    address: '1515 Ste-Catherine W',
    department: ['Building, Civil and Environmental Engineering (BCEE)',
      'Centre for Engineering in Society',
      'Computer Science and Software Engineering (CSSE)',
      'Concordia Institute for Information Systems Engineering (CIISE)',
      'Chemical and Materials Engineering (CME)',
      'Electrical and Computer Engineering (ECE)',
      'Mechanical, Industrial and Aerospace Engineering (MIAE)'],
    latitude: 45.495376,
    longtitude: -73.577997,
    accessiblity: true,
    image: [{ image: require('./images/ev-building.jpg') }],
    polygon: {
      name: 'Engineering, Computer Science and Visual Arts Inte',
      coordinates:
      [
        { latitude: 45.495591, longitude: -73.578763 },
        { latitude: 45.495866, longitude: -73.578497 },
        { latitude: 45.495668, longitude: -73.578074 },
        { latitude: 45.496048, longitude: -73.577709 },
        { latitude: 45.495831, longitude: -73.577250 },
        { latitude: 45.495539, longitude: -73.577530 },
        { latitude: 45.495551, longitude: -73.577556 },
        { latitude: 45.495462, longitude: -73.577639 },
        { latitude: 45.495448, longitude: -73.577609 },
        { latitude: 45.495356, longitude: -73.577697 },
        { latitude: 45.495354, longitude: -73.577744 },
        { latitude: 45.495238, longitude: -73.577878 },
        { latitude: 45.495234, longitude: -73.577914 },
        { latitude: 45.495247, longitude: -73.578021 },
      ]
    },
  },
  {
    campus: 'SGW',
    building: 'B',
    buildingName: 'B Building',
    address: '2160 Bishop Street',
    latitude: 45.497856,
    longtitude: -73.579588,
    image: [{ image: require('./images/bBuilding.png') }],
    polygon: {
      name: 'B Annex',
      coordinates:
              [
                { latitude: 45.497922, longitude: -73.579455 },
                { latitude: 45.497884, longitude: -73.579373 },
                { latitude: 45.497705, longitude: -73.579560 },
                { latitude: 45.497740, longitude: -73.579636 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'CI',
    buildingName: 'CI Building',
    address: '2149 Mackay Street',
    latitude: 45.497467,
    longtitude: -73.579925,
    image: [{ image: require('./images/ciBuilding.png') }],
    polygon: {
      name: 'CI Annex',
      coordinates:
              [
                { latitude: 45.497590, longitude: -73.579838 },
                { latitude: 45.497406, longitude: -73.580013 },
                { latitude: 45.497363, longitude: -73.579929 },
                { latitude: 45.497549, longitude: -73.579746 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'LD',
    buildingName: 'LD Building',
    address: '1424 Bishop Street',
    latitude: 45.496697,
    longtitude: -73.577312,
    image: [{ image: require('./images/ldBuilding.png') }],
    polygon: {
      name: 'LD Building',
      coordinates:
              [
                { latitude: 45.496890, longitude: -73.579475 },
                { latitude: 45.496931, longitude: -73.579554 },
                { latitude: 45.496700, longitude: -73.579783 },
                { latitude: 45.496676, longitude: -73.579733 },
                { latitude: 45.496802, longitude: -73.579607 },
                { latitude: 45.496788, longitude: -73.579574 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'CL',
    buildingName: 'CL Building',
    address: '1665 Ste-Catherine W',
    latitude: 45.494259,
    longtitude: -73.579007,
    image: [{ image: require('./images/clBuilding.png') }],
    polygon: {
      name: 'CL Annex',
      coordinates:
              [
                { latitude: 45.494473, longitude: -73.579278 },
                { latitude: 45.494166, longitude: -73.579656 },
                { latitude: 45.493970, longitude: -73.579311 },
                { latitude: 45.494260, longitude: -73.578934 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'MB',
    buildingName: 'John Molson Building',
    address: '1450 Guy Street',
    latitude: 45.495304,
    longtitude: -73.579044,
    image: [{ image: require('./images/mbBuilding.jpg') }],
    polygon: {
      name: 'John Molson Building',
      coordinates:
              [
                { latitude: 45.494996, longitude: -73.578733 },
                { latitude: 45.495187, longitude: -73.578521 },
                { latitude: 45.495534, longitude: -73.579216 },
                { latitude: 45.495363, longitude: -73.579384 },
                { latitude: 45.495216, longitude: -73.579115 },
                { latitude: 45.495164, longitude: -73.579173 },
                { latitude: 45.494999, longitude: -73.578818 },
                { latitude: 45.495033, longitude: -73.578784 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'D',
    buildingName: 'D Building',
    address: '2140 Bishop Street',
    latitude: 45.497827,
    longtitude: -73.579409,
    image: [{ image: require('./images/dBuilding.jpg') }],
    polygon: {
      name: 'D Annex',
      coordinates:
              [
                { latitude: 45.497741, longitude: -73.579413 },
                { latitude: 45.497850, longitude: -73.579302 },
                { latitude: 45.497810, longitude: -73.579230 },
                { latitude: 45.497707, longitude: -73.579341 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'EN',
    buildingName: 'EN Building',
    address: '2070 Mackay Street',
    latitude: 45.496944,
    longtitude: -73.579555,
    image: [{ image: require('./images/enBuilding.png') }],
    polygon: {
      name: 'D Annex',
      coordinates:
              [
                { latitude: 45.496856, longitude: -73.579757 },
                { latitude: 45.496815, longitude: -73.579671 },
                { latitude: 45.496908, longitude: -73.579577 },
                { latitude: 45.496949, longitude: -73.579665 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'ER',
    buildingName: 'ER Building',
    address: '2155 Guy Street ',
    latitude: 45.496428,
    longtitude: -73.579990,
    image: [{ image: require('./images/erBuilding.jpg') }],
    polygon: {
      name: 'ER Annex',
      coordinates:
              [
                { latitude: 45.496824, longitude: -73.579660 },
                { latitude: 45.496803, longitude: -73.579606 },
                { latitude: 45.496676, longitude: -73.579735 },
                { latitude: 45.496701, longitude: -73.579785 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'FA',
    buildingName: 'FA Building',
    address: '2060 Mackay Street ',
    latitude: 45.496874,
    longtitude: -73.579468,
    image: [{ image: require('./images/faBuilding.jpg') }],
    polygon: {
      name: 'FA Annex',
      coordinates:
              [
                { latitude: 45.496776, longitude: -73.579585 },
                { latitude: 45.496872, longitude: -73.579489 },
                { latitude: 45.496831, longitude: -73.579406 },
                { latitude: 45.496735, longitude: -73.579501 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'M',
    buildingName: 'M Building',
    address: '2135 Mackay Street ',
    latitude: 45.497368,
    longtitude: -73.579777,
    image: [{ image: require('./images/mBuilding.jpg') }],
    polygon: {
      name: 'M Annex',
      coordinates:
              [
                { latitude: 45.497424, longitude: -73.579750 },
                { latitude: 45.497322, longitude: -73.579849 },
                { latitude: 45.497289, longitude: -73.579780 },
                { latitude: 45.497389, longitude: -73.579682 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'MI',
    buildingName: 'MI Building',
    address: '2130 Bishop Street',
    latitude: 45.497807,
    longtitude: -73.579261,
    image: [{ image: require('./images/miBuilding.png') }],
    polygon: {
      name: 'MI Annex',
      coordinates:
              [
                { latitude: 45.497809, longitude: -73.579229 },
                { latitude: 45.497706, longitude: -73.579342 },
                { latitude: 45.497647, longitude: -73.579403 },
                { latitude: 45.497623, longitude: -73.579353 },
                { latitude: 45.497693, longitude: -73.579285 },
                { latitude: 45.497681, longitude: -73.579260 },
                { latitude: 45.497778, longitude: -73.579166 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'MU',
    buildingName: 'MU Building',
    address: '2170 Bishop Street',
    latitude: 45.497963,
    longtitude: -73.579506,
    polygon: {
      name: 'MU Annex',
      coordinates:
              [
                { latitude: 45.497747, longitude: -73.579629 },
                { latitude: 45.497785, longitude: -73.579704 },
                { latitude: 45.497963, longitude: -73.579536 },
                { latitude: 45.497918, longitude: -73.579458 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'R',
    buildingName: 'R Building',
    address: '2050 Mackay Street',
    latitude: 45.496826,
    longtitude: -73.579389,
    image: [{ image: require('./images/rBuilding.png') }],
    polygon: {
      name: 'R Annex',
      coordinates:
              [
                { latitude: 45.496837, longitude: -73.579399 },
                { latitude: 45.496745, longitude: -73.579491 },
                { latitude: 45.496710, longitude: -73.579421 },
                { latitude: 45.496802, longitude: -73.579329 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'S',
    buildingName: 'S Building',
    address: '2145 Mackay Street',
    latitude: 45.497423,
    longtitude: -73.579851,
    image: [{ image: require('./images/sBuilding.png') }],
    polygon: {
      name: 'S Annex',
      coordinates:
              [
                { latitude: 45.497423, longitude: -73.579748 },
                { latitude: 45.497437, longitude: -73.579773 },
                { latitude: 45.497459, longitude: -73.579751 },
                { latitude: 45.497490, longitude: -73.579813 },
                { latitude: 45.497365, longitude: -73.579933 },
                { latitude: 45.497324, longitude: -73.579848 },
              ]
    }
  },
  {
    campus: 'SGW',
    building: 'SB',
    buildingName: 'Samuel Bronfman Building',
    address: '1590 Doctor Penfield',
    latitude: 45.496600,
    longtitude: -73.586090,
    image: [{ image: require('./images/sbBuilding.png') }],
    polygon: {
      name: 'S Annex',
      coordinates:
              [
                { latitude: 45.496684, longitude: -73.586086 },
                { latitude: 45.496538, longitude: -73.586211 },
                { latitude: 45.496437, longitude: -73.586207 },
                { latitude: 45.496467, longitude: -73.585738 },
                { latitude: 45.496492, longitude: -73.585738 },
                { latitude: 45.496554, longitude: -73.585792 },
                { latitude: 45.496582, longitude: -73.585828 },
                { latitude: 45.496659, longitude: -73.586008 },
              ]
    }
  },
];
export default buildings;
