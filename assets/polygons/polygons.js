// each building is made of many polygons, each polygon will have an array of coordinates

let buildings = 
[
 {
    name: "Hall",
    polygons: [
            {
                name: "hall_1",
                coordinates: [
                            {
                                latitude:45.497164, 
                                longitude: -73.579548
                            },
                            {
                                latitude:45.497720,
                                longitude: -73.579030
                            },
                            {
                                latitude:45.497352,
                                longitude:-73.578306
                            },
                            {
                                latitude:45.496824,
                                longitude: -73.578850
                            }]
            }
                ]
 },
 {
    name: "EV",
    polygons: [
            {
                name: "ev_1",
                coordinates: [
                            {
                                latitude:45.495599, 
                                longitude: -73.578679
                            },
                            {
                                latitude:45.495842,
                                longitude:  -73.578451
                            },
                            {
                                latitude:45.495455, 
                                longitude: -73.577633
                            },
                            {
                                latitude:45.495225, 
                                longitude: -73.577911
                            }]
            },
            {
                name: "ev_2",
                coordinates: [
                        {
                            latitude:45.495528,
                            longitude: -73.577544
                        },
                            {
                                latitude:45.495678, 
                                longitude: -73.578067
                            },
                            {
                                latitude:45.496047, 
                                longitude: -73.577710, 
                            },
                            {
                                latitude:45.495831, 
                                longitude: -73.577249
                            },
                            
                        ]
            }
                ]
},
]
export default buildings;