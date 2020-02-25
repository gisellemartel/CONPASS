// each building is made of many polygons, each polygon will have an array of coordinates

let buildings = [
    /*LOYOLA CAMPUS BUILDINGS*/
    {
        campus: "LOY",
        building: "VL",
        buildingName: "Vanier Library building",
        address: "7141 Sherbrooke W",
        latitude: 45.459026,
        longitude: -73.638606,
        polygons: [{
            name: "Vanier Library building",
            coordinates: 
            [
                {latitude:45.459484, longitude: -73.639135},
                {latitude:45.459303,longitude: -73.638672},
                {latitude:45.459313,longitude: -73.638663},
                {latitude:45.459133,longitude: -73.638197},
                {latitude:45.459214,longitude: -73.638133},
                {latitude:45.459102,longitude: -73.637845},
                {latitude:45.458901,longitude: -73.638002},
                {latitude:45.458865,longitude: -73.638237},
                {latitude:45.458703,longitude: -73.638363},
                {latitude:45.458717,longitude: -73.638399},
                {latitude:45.458630,longitude: -73.638468},
                {latitude:45.458829,longitude: -73.638983},
                {latitude:45.458837,longitude: -73.638976},
                {latitude:45.458854,longitude: -73.639020},
                {latitude:45.459050,longitude: -73.638865},
                {latitude:45.459095,longitude: -73.638985},
                {latitude:45.458990,longitude: -73.639125},
                {latitude:45.459107,longitude: -73.639419}
            ]
        }]
    },
    {
        campus: "LOY",
        building: "PY",
        buildingName: "Psychology Building",
        address: "7141 Sherbrooke W",
        latitude: 45.458938,
        longitude: -73.640467,
        polygons: [{
            name: "Psychology Building",
            coordinates: 
            [
                {latitude: 45.459295, longitude: -73.640587},
                {latitude: 45.459114, longitude: -73.640113},
                {latitude: 45.458690, longitude: -73.640391},
                {latitude: 45.458845, longitude: -73.640857},
            ]
        }]
    },
    {
    campus: "LOY",
        building: "FC",
        buildingName: "F.C. Smith Building",
        address: "7141 Sherbrooke West",
        latitude: 45.458493,
        longitude: -73.639287,
        polygons: [{
            name: "F.C. Smith Building",
            coordinates: 
            [
                {latitude: 45.458808,longitude: -73.639603},
                {latitude: 45.458645,longitude: -73.639759},
                {latitude: 45.458359,longitude: -73.639037},
                {latitude: 45.458569,longitude: -73.638849}
            ]
        }]
    },
    {
        campus: "LOY",
        building: "SP",
        buildingName: "Richard J. Renaud Science Complex",
        address: "7141 Sherbrooke W",
        latitude: 45.457881,
        longitude: -73.641565,
        polygons: [{
            name: "Richard J. Renaud Science Complex",
            coordinates: 
            [
                {latitude: 45.456983, longitude: -73.640829},
                {latitude: 45.457438, longitude: -73.642004},
                {latitude: 45.457641, longitude: -73.641846},
                {latitude: 45.457672, longitude: -73.641926},
                {latitude: 45.458328, longitude: -73.641412},
                {latitude: 45.458194, longitude: -73.641038},
                {latitude: 45.458341, longitude: -73.640922},
                {latitude: 45.458317, longitude: -73.640860},
                {latitude: 45.457525, longitude: -73.641470},
                {latitude: 45.457203, longitude: -73.640654},
            ]
        }]
    },
    {
        campus: "LOY",
        building: "CC",
        buildingName: "Central Building",
        address: "7141 Sherbrooke West",
        latitude: 45.458204,
        longitude: -73.640300,
        polygons: [{
            name: "Central Building",
            coordinates: 
            [
                {latitude: 45.457798, longitude: -73.639827},
                {latitude: 45.457911, longitude: -73.640125},
                {latitude: 45.457985, longitude: -73.640067},
                {latitude: 45.457962, longitude: -73.640007},
                {latitude: 45.458107, longitude: -73.639907},
                {latitude: 45.458123, longitude: -73.639944},
                {latitude: 45.458079, longitude: -73.640012},
                {latitude: 45.458378, longitude: -73.640795},
                {latitude: 45.458438, longitude: -73.640749},
                {latitude: 45.458463, longitude: -73.640813},
                {latitude: 45.458414, longitude: -73.640852},
                {latitude: 45.458473, longitude: -73.641007},
                {latitude: 45.458382, longitude: -73.641075},
                {latitude: 45.458508, longitude: -73.641375},
                {latitude: 45.458806, longitude: -73.641159},
                {latitude: 45.458821, longitude: -73.641129},
                {latitude: 45.458784, longitude: -73.641034},
                {latitude: 45.458764, longitude: -73.641050},
                {latitude: 45.458684, longitude: -73.640807},
                {latitude: 45.458587, longitude: -73.640879},
                {latitude: 45.458540, longitude: -73.640756},
                {latitude: 45.458514, longitude: -73.640774},
                {latitude: 45.458488, longitude: -73.640709},
                {latitude: 45.458519, longitude: -73.640686},
                {latitude: 45.458220, longitude: -73.639904},
                {latitude: 45.458166, longitude: -73.639946},
                {latitude: 45.458142, longitude: -73.639881},
                {latitude: 45.458276, longitude: -73.639766},
                {latitude: 45.458297, longitude: -73.639822},
                {latitude: 45.458372, longitude: -73.639766},
                {latitude: 45.458260, longitude: -73.639468},
                {latitude: 45.458183, longitude: -73.639526},
                {latitude: 45.458201, longitude: -73.639616},
                {latitude: 45.458087, longitude: -73.639689},
                {latitude: 45.458039, longitude: -73.639580},
                {latitude: 45.457982, longitude: -73.639624},
                {latitude: 45.458023, longitude: -73.639753},
                {latitude: 45.457915, longitude: -73.639836},
                {latitude: 45.457876, longitude: -73.639766},
                ]
        }]
    },
    {
        campus: "LOY",
        building: "CJ",
        buildingName: "Communication Studies and Journalism Building",
        address: "7141 Sherbrooke West",
        latitude: 45.457478,
        longitude: -73.640354,
        polygons: [{
            name: "Communications & Journalism building",
            coordinates:
            [
                {latitude: 45.457175, longitude: -73.640391},
                {latitude: 45.457279, longitude: -73.640658},
                {latitude: 45.457303, longitude: -73.640639},
                {latitude: 45.457334, longitude: -73.640718},
                {latitude: 45.457596, longitude: -73.640503},
                {latitude: 45.457650, longitude: -73.640631},
                {latitude: 45.457831, longitude: -73.640484},
                {latitude: 45.457754, longitude: -73.640291},
                {latitude: 45.457726, longitude: -73.640314},
                {latitude: 45.457623, longitude: -73.640044},
                {latitude: 45.457485, longitude: -73.640150},
                {latitude: 45.457436, longitude: -73.640027},
                {latitude: 45.457480, longitude: -73.639821},
                {latitude: 45.457377, longitude: -73.639761},
                {latitude: 45.457282, longitude: -73.639800},
                {latitude: 45.457230, longitude: -73.639885},
                {latitude: 45.457211, longitude: -73.640016},
                {latitude: 45.457305, longitude: -73.640074},
                {latitude: 45.457361, longitude: -73.640075},
                {latitude: 45.457410, longitude: -73.640206},
            ]
        }]
    },

    /* SGW Campus Buildings */
    {
        campus: "SGW",
        building: "GN",
        buildingName: "Grey Nuns",
        address: "1190 guy street",
        latitude: "45.493484",
        longtitude: "-73.576748",
        polygons: [{
            name: "Grey Nuns",
            coordinates: 
            [
                {latitude: 45.492593,longitude: -73.576535},
                {latitude: 45.492731,longitude: -73.576396},
                {latitude: 45.492900,longitude: -73.576743},
                {latitude: 45.492925,longitude: -73.576747},
                {latitude: 45.492925,longitude: -73.576747},
                {latitude: 45.492949,longitude: -73.576791},
                {latitude: 45.492941,longitude: -73.576832},
                {latitude: 45.493025,longitude: -73.577005},
                {latitude: 45.493363,longitude: -73.576673},
                {latitude: 45.493341,longitude: -73.576625},
                {latitude: 45.493471,longitude: -73.576497},
                {latitude: 45.493493,longitude: -73.576543},
                {latitude: 45.493793,longitude: -73.576245},
                {latitude: 45.493569,longitude: -73.575783},
                {latitude: 45.493712,longitude: -73.575641},
                {latitude: 45.493934,longitude: -73.576094},
                {latitude: 45.494035,longitude: -73.575996},
                {latitude: 45.494121,longitude: -73.576178},
                {latitude: 45.494018,longitude: -73.576283},
                {latitude: 45.494391,longitude: -73.577057},
                {latitude: 45.494094,longitude: -73.577348},
                {latitude: 45.494124,longitude: -73.577412},
                {latitude: 45.493975,longitude: -73.577560},
                {latitude: 45.493869,longitude: -73.577339},
                {latitude: 45.494192,longitude: -73.577020},
                {latitude: 45.493896,longitude: -73.576409},
                {latitude: 45.493551,longitude: -73.576748},
                {latitude: 45.493613,longitude: -73.576875},
                {latitude: 45.493668,longitude: -73.576822},
                {latitude: 45.493726,longitude: -73.576944},
                {latitude: 45.493672,longitude: -73.576999},
                {latitude: 45.493747,longitude: -73.577156},
                {latitude: 45.493634,longitude: -73.577267},
                {latitude: 45.493580,longitude: -73.577153},
                {latitude: 45.493600,longitude: -73.577132},
                {latitude: 45.493576,longitude: -73.577082},
                {latitude: 45.493529,longitude: -73.577128},
                {latitude: 45.493450,longitude: -73.576963},
                {latitude: 45.493478,longitude: -73.576935},
                {latitude: 45.493438,longitude: -73.576853},
                {latitude: 45.493353,longitude: -73.576938},
                {latitude: 45.493362,longitude: -73.576960},
                {latitude: 45.493108,longitude: -73.577212},
                {latitude: 45.493200,longitude: -73.577402},
                {latitude: 45.493088,longitude: -73.577510},
                {latitude: 45.492992,longitude: -73.577314},
                {latitude: 45.492925,longitude: -73.577379},
                {latitude: 45.492839,longitude: -73.577198},
                {latitude: 45.492895,longitude: -73.577141},
                {latitude: 45.492809,longitude: -73.576963},
                {latitude: 45.492793,longitude: -73.576977},
                {latitude: 45.492772,longitude: -73.576972},
                {latitude: 45.492710,longitude: -73.577032},
                {latitude: 45.492677,longitude: -73.576965},
                {latitude: 45.492677,longitude: -73.576923},
                {latitude: 45.492727,longitude: -73.576875},
                {latitude: 45.492746,longitude: -73.576868},
                {latitude: 45.492609,longitude: -73.576584},
                {latitude: 45.492614,longitude: -73.576577}

            ]
        }]
    },
    {
        campus: "SGW",
        building: "GM",
        buildingName: "GM_building",
        address: "1550 DeMaisonneuve W",
        latitude: "45.495983",
        longtitude: "-73.578824",
        polygons: [{
            name: "GM_building",
            coordinates: 
            [
                {latitude: 45.496130, longitude: -73.578810},
                {latitude: 45.495781, longitude: -73.579146},
                {latitude: 45.495762, longitude: -73.579108},
                {latitude: 45.495779, longitude: -73.579089},
                {latitude: 45.495618, longitude: -73.578746},
                {latitude: 45.495947, longitude: -73.578435},
            ]
        }]
    },
    {
        campus: "SGW",
        building: "FB",
        buildingName: "Faubourg Building",
        address: "1250 Guy Street",
        latitude: 45.494666,
        longitude: -73.577603,
        polygons: [{
            name: "FB_building",
            coordinates: 
            [
                {latitude: 45.494698,longitude: -73.578035},
                {latitude: 45.494912,longitude: -73.577787},
                {latitude: 45.494654,longitude: -73.577219},
                {latitude: 45.494397,longitude: -73.577520}
            ]
        }]
    },
    {
        campus: "SGW",
        building: "LB",
        buildingName: "Webster Library Building",
        address: "1400 DeMaisonneuve W",
        latitude: 45.497050,
        longtitude: -73.578009,
        polygons: [{
            name: "Webster Library Building",
            coordinates: 
            [
                {latitude: 45.497284, longitude: -73.578062},
                {latitude: 45.496698, longitude: -73.578638},
                {latitude: 45.496227, longitude: -73.577702},
                {latitude: 45.496862, longitude: -73.577063},
            ]
        }]
    },
    {
        campus: "SGW",
        building: "H",
        buildingName: "Henry F. Hall Building",
        address: "1455 DeMaisonneuve W",
        latitude: 45.497092,
        longtitude: -73.578800,
        polygons: [{
            name: "Henry F. Hall Building",
            coordinates: 
            [
                {latitude: 45.497373, longitude: -73.578336},
                {latitude: 45.497710, longitude: -73.579032},
                {latitude: 45.497164, longitude: -73.579545},
                {latitude: 45.496829, longitude: -73.578848},
            ]
        }]
    },
    {
        campus: "SGW",
        building: "EV",
        buildingName: "Engineering, Computer Science and Visual Arts Inte",
        address: "1515 Ste-Catherine W",
        latitude: 45.495376,
        longtitude: -73.577997,
        polygons: [{
            name: "Engineering, Computer Science and Visual Arts Inte",
            coordinates: 
            [
                {latitude: 45.495599,longitude: -73.578679},
                {latitude: 45.495842,longitude: -73.578451},
                {latitude: 45.495455,longitude: -73.577633},
                {latitude: 45.495225,longitude: -73.577911}
            ]
        },
        {
            name: "Engineering, Computer Science and Visual Arts Inte_2",
            coordinates:
            [
                {latitude: 45.495670, longitude: -73.578075},
                {latitude: 45.496048, longitude: -73.577708},
                {latitude: 45.495829, longitude: -73.577248},
                {latitude: 45.495539, longitude: -73.577530},
                {latitude: 45.495550, longitude: -73.577555},
                {latitude: 45.495462, longitude: -73.577637},
            ]
        }
        ]
    },
]
export default buildings;