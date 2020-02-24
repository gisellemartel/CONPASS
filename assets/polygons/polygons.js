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
            coordinates: [{
                latitude:45.459484, 
                longitude: -73.639135
            },
            {
                latitude:45.459303,
                longitude: -73.638672
            },
            {
                latitude:45.459313,
                longitude: -73.638663
            },
            {
                latitude:45.459133,
                longitude: -73.638197
            },
            {
                latitude:45.459214,
                longitude: -73.638133
            },
            {
                latitude:45.459102,
                longitude: -73.637845
            },
            {
                latitude: 45.458901,
                longitude: -73.638002
            },
            {
                latitude:45.458865,
                longitude: -73.638237
            },
            {
                latitude:45.458703,
                longitude:-73.638363
            },
            {
                latitude: 45.458717,
                longitude:-73.638399
            },
            {
                latitude: 45.458630,
                longitude: -73.638468
            },
            {
                latitude:  45.458829,
                longitude: -73.638983
            },
            {
                latitude: 45.458837,
                longitude: -73.638976
            },
            {
                latitude:45.458854,
                longitude: -73.639020
            },
            {
                latitude: 45.459050,
                longitude: -73.638865
            },
            {
                latitude: 45.459095,
                longitude: -73.638985
            },
            {
                latitude:45.458990,
                longitude: -73.639125
            },
            {
                latitude: 45.459107,
                longitude: -73.639419
            }
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
            coordinates: [{
                latitude: 45.458408,
                longitude: -73.641537
            },
            {
                latitude: 45.457507,
                longitude: -73.642148
            },
            {
                latitude: 45.456759,
                longitude: -73.640444
            },
            {
                latitude: 45.457021,
                longitude: -73.639932
            },
            {
                latitude: 45.457578,
                longitude: -73.641375
            },
            {
                latitude: 45.458158,
                longitude: -73.640961
            }
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
            coordinates: [{
                latitude: 45.458139,
                longitude: -73.640995
            },
            {
                latitude: 45.458587,
                longitude: -73.640605
            },
            {
                latitude: 45.458015,
                longitude: -73.639060
            },
            {
                latitude: 45.457508,
                longitude: -73.639431
            }
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
            coordinates: [{
                latitude: 45.457348,
                longitude: -73.640747
            },
            {
                latitude: 45.457192,
                longitude: -73.640441
            },
            {
                latitude: 45.457392,
                longitude: -73.640184
            },
            {
                latitude: 45.457242,
                longitude: -73.640036
            },
            {
                latitude: 45.457259,
                longitude: -73.639829
            },
            {
                latitude: 45.457418,
                longitude: -73.639760
            },
            {
                latitude: 45.457499,
                longitude: -73.639848
            },
            {
                latitude: 45.457457,
                longitude: -73.640058
            },
            {
                latitude: 45.457493,
                longitude: -73.640143
            },
            {
                latitude: 45.457629,
                longitude: -73.640045
            },
            {
                latitude: 45.457771,
                longitude: -73.640389
            }

            ]
        }]
    },

    /* SGW Campus Buildings */
    {
        campus: "SGW",
        building: "GN",
        buildingName: "Grey_Nuns",
        address: "1190 guy street",
        latitude: "45.493484",
        longtitude: "-73.576748",
        polygons: [{
            name: "Grey_Nuns",
            coordinates: [{
                latitude: 45.492593,
                longitude: -73.576535
            },
            {
                latitude: 45.492731,
                longitude: -73.576396
            },
            {
                latitude: 45.492900,
                longitude: -73.576743
            },
            {
                latitude: 45.492925,
                longitude: -73.576747
            },
            {
                latitude: 45.492925,
                longitude: -73.576747
            },
            {
                latitude: 45.492949,
                longitude: -73.576791
            },
            {
                latitude: 45.492941,
                longitude: -73.576832
            },
            {
                latitude: 45.493025,
                longitude: -73.577005
            },
            {
                latitude: 45.493363,
                longitude: -73.576673
            },
            {
                latitude: 45.493341,
                longitude: -73.576625
            },
            {
                latitude: 45.493471,
                longitude: -73.576497
            },
            {
                latitude: 45.493493,
                longitude: -73.576543
            },
            {
                latitude: 45.493793,
                longitude: -73.576245
            },
            {
                latitude: 45.493569,
                longitude: -73.575783
            },
            {
                latitude: 45.493712,
                longitude: -73.575641
            },
            {
                latitude: 45.493934,
                longitude: -73.576094
            },
            {
                latitude: 45.494035,
                longitude: -73.575996
            },
            {
                latitude: 45.494121,
                longitude: -73.576178
            },
            {
                latitude: 45.494018,
                longitude: -73.576283
            },
            {
                latitude: 45.494391,
                longitude: -73.577057
            },
            {
                latitude: 45.494094,
                longitude: -73.577348,
            },
            {
                latitude: 45.494124,
                longitude: -73.577412,
            },
            {
                latitude: 45.493975,
                longitude: -73.577560,
            },
            {
                latitude: 45.493869,
                longitude: -73.577339,
            },
            {
                latitude: 45.494192,
                longitude: -73.577020,
            },
            {
                latitude: 45.493896,
                longitude: -73.576409,
            }, {
                latitude: 45.493551,
                longitude: -73.576748,
            }, {
                latitude: 45.493613,
                longitude: -73.576875,
            }, {
                latitude: 45.493668,
                longitude: -73.576822,
            }, {
                latitude: 45.493726,
                longitude: -73.576944,
            }, {
                latitude: 45.493672,
                longitude: -73.576999,
            }, {
                latitude: 45.493747,
                longitude: -73.577156,
            }, {
                latitude: 45.493634,
                longitude: -73.577267,
            }, {
                latitude: 45.493580,
                longitude: -73.577153,
            }, {
                latitude: 45.493600,
                longitude: -73.577132,
            }, {
                latitude: 45.493576,
                longitude: -73.577082,
            }, {
                latitude: 45.493529,
                longitude: -73.577128,
            }, {
                latitude: 45.493450,
                longitude: -73.576963,
            }, {
                latitude: 45.493478,
                longitude: -73.576935,
            }, {
                latitude: 45.493438,
                longitude: -73.576853,
            }, {
                latitude: 45.493353,
                longitude: -73.576938,
            }, {
                latitude: 45.493362,
                longitude: -73.576960
            }, {
                latitude: 45.493108,
                longitude: -73.577212,
            }, {
                latitude: 45.493200,
                longitude: -73.577402,
            }, {
                latitude: 45.493088,
                longitude: -73.577510,
            }, {
                latitude: 45.492992,
                longitude: -73.577314,
            }, {
                latitude: 45.492925,
                longitude: -73.577379,
            }, {
                latitude: 45.492839,
                longitude: -73.577198,
            }, {
                latitude: 45.492895,
                longitude: -73.577141,
            }, {
                latitude: 45.492809,
                longitude: -73.576963,
            }, {
                latitude: 45.492793,
                longitude: -73.576977,
            }, {
                latitude: 45.492772,
                longitude: -73.576972,
            }, {
                latitude: 45.492710,
                longitude: -73.577032,
            }, {
                latitude: 45.492677,
                longitude: -73.576965,
            }, {
                latitude: 45.492677,
                longitude: -73.576923,
            }, {
                latitude: 45.492727,
                longitude: -73.576875,
            }, {
                latitude: 45.492746,
                longitude: -73.576868,
            }, {
                latitude: 45.492609,
                longitude: -73.576584,
            }, {
                latitude: 45.492614,
                longitude: -73.576577,
            }

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
            coordinates: [{
                latitude: 45.495780,
                longitude: -73.579146
            },
            {
                latitude: 45.496134,
                longitude: -73.578809
            },
            {
                latitude: 45.495948,
                longitude: -73.578435
            },
            {
                latitude: 45.495628,
                longitude: -73.578763
            }
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
            coordinates: [{
                latitude: 45.494698,
                longitude: -73.578035
            },
            {
                latitude: 45.494912,
                longitude: -73.577787
            },
            {
                latitude: 45.494654,
                longitude: -73.577219
            },
            {
                latitude: 45.494397,
                longitude: -73.577520
            }
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
            coordinates: [{
                latitude: 45.497164,
                longitude: -73.579548
            },
            {
                latitude: 45.497720,
                longitude: -73.579030
            },
            {
                latitude: 45.497352,
                longitude: -73.578306
            },
            {
                latitude: 45.496824,
                longitude: -73.578850
            }
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
            coordinates: [{
                latitude: 45.495599,
                longitude: -73.578679
            },
            {
                latitude: 45.495842,
                longitude: -73.578451
            },
            {
                latitude: 45.495455,
                longitude: -73.577633
            },
            {
                latitude: 45.495225,
                longitude: -73.577911
            }
            ]
        },
        {
            name: "Engineering, Computer Science and Visual Arts Inte_2",
            coordinates: [{
                latitude: 45.495528,
                longitude: -73.577544
            },
            {
                latitude: 45.495678,
                longitude: -73.578067
            },
            {
                latitude: 45.496047,
                longitude: -73.577710,
            },
            {
                latitude: 45.495831,
                longitude: -73.577249
            },

            ]
        }
        ]
    },
]
export default buildings;