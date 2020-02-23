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
                    latitude: 45.458913,
                    longitude: -73.639501
                },
                {
                    latitude: 45.458517,
                    longitude: -73.638360
                },
                {
                    latitude: 45.459102,
                    longitude: -73.637713
                },
                {
                    latitude: 45.459540,
                    longitude: -73.639189
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