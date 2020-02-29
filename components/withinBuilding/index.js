import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text
} from 'react-native';
import buildings from '../../assets/polygons/polygons';

export default class WithinBuilding extends Component {
    
    constructor(props) {
        super(props);
        
        //converting SGW buildings into an appropriate format to be used in pnpoly method
        //sgwBuildings = this.formatPolygonsObjs('SGW');
        
        /*sgwBuildings = [];
        sgwBuildingsTemp = buildings.filter(building => building.campus=='SGW');
        sgwBuildingsTemp.forEach(building => {
            xCoordinates = [];
            yCoordinates = [];
            (building.polygons[0].coordinates).forEach(pairOfCoordinates =>{
                xCoordinates.push(pairOfCoordinates.longitude);
                yCoordinates.push(pairOfCoordinates.latitude);
            });
            sgwBuildings.push({name:building.buildingName, xCoords:xCoordinates, yCoords: yCoordinates});
        });
        console.log(sgwBuildings[5]);*/

        this.state = {
            //polygon covering all buildings in SGW
            xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
            ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],
            
            //polygon covering all buildings in Loyola

            //polygon covering individual buildings taken from polygons.js file
            xCoordinates: [-73.578062,-73.578638, -73.577702, -73.577063],
            yCoordinates: [45.497284,45.496698, 45.496227, 45.496862],

            
            
        }
        console.log('Inside constructor');
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
        console.log('--->'+c);
        return c;
    }

    //returns the name of building the user is currently located in
    buildingName(x, y){
        if(this.pnpoly((this.state.xSGWCoordinates).length, this.state.xSGWCoordinates, this.state.ySGWCoordinates, x, y)){
            console.log('in SGW');
        }else if(false){
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
