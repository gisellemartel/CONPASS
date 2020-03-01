import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import buildings from '../../assets/polygons/polygons';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet } from 'react-native';

export default class WithinBuilding extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            //user's current location
            location: '',

            //to display information
            fianlCampus: '',
            fianlBuilding: '',

            //polygon covering all buildings in SGW
            xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
            ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],
            
            //polygon covering all buildings in Loyola
            xLOYCoordinates: [-73.6465040, -73.6396194, -73.6330318, -73.6428850],
            yLOYCoordinates: [45.4572870, 45.4548085, 45.4581882, 45.4619310],

            //SGW buildings formatted for pnpoly use
            sgwBuildings: this.formatPolygonsObjs('SGW'),
            //Loyola buildings formatted for pnpoly use
            loyBuildings: this.formatPolygonsObjs('LOY') 
        }
    }

    //retrieves the users' current location
    async getCurrentLocation() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
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
        var i, j, c = false;
        for (i = 0, j = nvert-1; i < nvert; j = i++) {
            if ( ((verty[i]>testy) != (verty[j]>testy)) &&
            (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
            c = !c;
        }
        return c;
    }

    //returns the name of building the user is currently located in
    async buildingName(){
        await this.getCurrentLocation();
        
        const { location } = this.state;
        
        var x = location.coords.longitude;
        var y = location.coords.latitude;

        if(this.pnpoly((this.state.xSGWCoordinates).length, this.state.xSGWCoordinates, this.state.ySGWCoordinates, x, y)){
            this.state.fianlCampus = 'SGW';
            this.state.fianlBuilding = '';
            (this.state.sgwBuildings).forEach((sgwBuilding)=>{
                if(this.pnpoly((sgwBuilding.xCoords).length, sgwBuilding.xCoords, sgwBuilding.yCoords, x, y)){
                    this.state.fianlBuilding = sgwBuilding.name;
                    this.state.fianlCampus = 'SGW';    
                }
            });
        }else if(this.pnpoly((this.state.xLOYCoordinates).length, this.state.xLOYCoordinates, this.state.yLOYCoordinates, x, y)){
            this.state.fianlCampus = 'Loyola';
            this.state.fianlBuilding = '';
            (this.state.loyBuildings).forEach((loyBuilding)=>{
                if(this.pnpoly((loyBuilding.xCoords).length, loyBuilding.xCoords, loyBuilding.yCoords, x, y))
                    this.state.fianlBuilding=  loyBuilding.name;   
                    this.state.fianlCampus = 'Loyola';
            });
        }else{
            this.state.fianlCampus = '';
            this.state.fianlBuilding ='';
        }
            
    }

  render(){
    this.buildingName();
    
    return(
      <View>
          <View style={styles.userFinalLoc}>
            <Text>{this.state.fianlCampus}</Text>
            <Text>{this.state.fianlBuilding}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    userFinalLoc: {
        marginBottom: 10,
        paddingHorizontal: 20,
        backgroundColor:'pink',
        //position: 'absolute',
    },
});
