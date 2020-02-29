import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text
} from 'react-native';
import buildings from '../../assets/polygons/polygons';

export default class WithinBuilding extends Component {
    
    constructor(props) {
        super(props);
/*
               { latitude: 45.4548085, longitude: -73.6396194 },
                { latitude: 45.4581882, longitude: -73.6330318
*/
        this.state = {
            //polygon covering all buildings in SGW
            xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
            ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],
            
            //polygon covering all buildings in Loyola
            xLOYCoordinates: [-73.6465040, -73.6396194, -73.6330318, -73.6428850],
            yLOYCoordinates: [45.4572870, 45.4548085, 45.4581882, 45.4619310],

            //polygon covering individual buildings taken from polygons.js file
            xCoordinates: [-73.578062,-73.578638, -73.577702, -73.577063],
            yCoordinates: [45.497284,45.496698, 45.496227, 45.496862],
            
            //SGW buildings formatted for pnpoly use
            sgwBuildings: this.formatPolygonsObjs('SGW'),
            //Loyola buildings formatted for pnpoly use
            loyBuildings: this.formatPolygonsObjs('LOY') 
        }
    }

    //Format SGW or Loyola buildings to be used by pnpoly function
    formatPolygonsObjs(campus){
        if(campus != 'SGW' && campus != 'LOY')
            return;

        var formattedBuildings = [];
        var formattedBuildingsTemp = buildings.filter(building => building.campus==campus);
        formattedBuildingsTemp.forEach(building => {
            var xCoordinates = [];
            var yCoordinates = [];
            (building.polygons[0].coordinates).forEach(pairOfCoordinates =>{
                xCoordinates.push(pairOfCoordinates.longitude);
                yCoordinates.push(pairOfCoordinates.latitude);
            });
            formattedBuildings.push({name:building.buildingName, xCoords:xCoordinates, yCoords: yCoordinates});
        });
        return formattedBuildings;
    }
    
    //finds if a pair of coordinates are inside a polygon
    pnpoly(nvert, vertx, verty, testx, testy)
    {
        var i, j, c = 0;
        for (i = 0, j = nvert-1; i < nvert; j = i++) {
            if ( ((verty[i]>testy) != (verty[j]>testy)) &&
            (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
            c = !c;
        }
        nvert=null, vertx, verty, testx, testy
        //console.log('--->'+c);
        return c;
    }

    //returns the name of building the user is currently located in
    buildingName(x, y){
        if(this.pnpoly((this.state.xSGWCoordinates).length, this.state.xSGWCoordinates, this.state.ySGWCoordinates, x, y)){
            (this.state.sgwBuildings).forEach((sgwBuilding)=>{
                if(this.pnpoly((sgwBuilding.xCoords).length, sgwBuilding.xCoords, sgwBuilding.yCoords, x, y))
                    console.log(sgwBuilding.name);
            });
            console.log('------in SGW');
        }else if(this.pnpoly((this.state.xLOYCoordinates).length, this.state.xLOYCoordinates, this.state.yLOYCoordinates, x, y)){
            (this.state.loyBuildings).forEach((loyBuilding)=>{
                if(this.pnpoly((loyBuilding.xCoords).length, loyBuilding.xCoords, loyBuilding.yCoords, x, y))
                    console.log(loyBuilding.name);
            });
            console.log('in Loyola');
        }else{
            console.log('NOT @ Concordia');
        }
            
    }
  render(){
     
    //update user's location 
    /*this.state.xPoint= ;
    this.state.yPoint= ;*/

    this.buildingName(this.props.userLocation.longitude,this.props.userLocation.latitude);
    //this.pnpoly(4, this.state.xCoordinates, this.state.yCoordinates, this.state.xPoint, this.state.yPoint);
    return(
      <View>
        
      </View>
    );
  }
}
