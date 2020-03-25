/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import buildings from '../../assets/polygons/polygons';

export default class WithinBuilding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user's current location
      location: {},

      // to display information
      campusDisplayName: '',
      buildingDisplayName: '',

      // polygon covering all buildings in SGW
      xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
      ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],

      // polygon covering all buildings in Loyola
      xLOYCoordinates: [-73.6465040, -73.6396194, -73.6330318, -73.6428850],
      yLOYCoordinates: [45.4572870, 45.4548085, 45.4581882, 45.4619310],

      // SGW buildings formatted for isInPolygon use
      sgwBuildings: this.formatPolygonsObjs('SGW'),
      // Loyola buildings formatted for isInPolygon use
      loyBuildings: this.formatPolygonsObjs('LOY')
    };
  }

  // retrieves the users' current location
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

  // Format SGW or Loyola buildings to be used by isInPolygon function
  formatPolygonsObjs(campus) {
    if (campus !== 'SGW' && campus !== 'LOY') {
      return [];
    }

    const formattedBuildings = [];

    // filter only the buildings that belong to the current campus
    const formattedBuildingsTemp = buildings.filter((building) => {
      return building.campus === campus;
    });

    formattedBuildingsTemp.forEach((building) => {
      const xCoordinates = [];
      const yCoordinates = [];

      const buildingPolygon = building.polygon;

      (buildingPolygon.coordinates).forEach((pairOfCoordinates) => {
        xCoordinates.push(pairOfCoordinates.longitude);
        yCoordinates.push(pairOfCoordinates.latitude);
      });

      formattedBuildings.push({
        name: building.buildingName,
        xCoords: xCoordinates,
        yCoords: yCoordinates
      });
    });

    return formattedBuildings;
  }

  // finds if a pair of coordinates are inside a polygon
  // Algorithm comes from: https://stackoverflow.com/questions/11716268/point-in-polygon-algorithm?lq=1
  // Date Consulted: February 29th, 2020
  isInPolygon(nvert, vertx, verty, testx, testy) {
    let i;
    let j;
    let c = false;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (((verty[i] > testy) !== (verty[j] > testy))
            && (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) { c = !c; }
    }
    return c;
  }

  // returns the name of building the user is currently located in
  async buildingName() {
    await this.getCurrentLocation();

    const { location } = this.state;

    const x = location.coords.longitude;
    const y = location.coords.latitude;

    if (this.isInPolygon((this.state.xSGWCoordinates).length, this.state.xSGWCoordinates, this.state.ySGWCoordinates, x, y)) {
      this.state.campusDisplayName = 'SGW';
      this.state.buildingDisplayName = '';
      (this.state.sgwBuildings).forEach((sgwBuilding) => {
        if (this.isInPolygon((sgwBuilding.xCoords).length, sgwBuilding.xCoords, sgwBuilding.yCoords, x, y)) {
          this.state.buildingDisplayName = sgwBuilding.name;
          this.state.campusDisplayName = 'SGW';
        }
      });
    } else if (this.isInPolygon((this.state.xLOYCoordinates).length, this.state.xLOYCoordinates, this.state.yLOYCoordinates, x, y)) {
      this.state.campusDisplayName = 'Loyola';
      this.state.buildingDisplayName = '';
      (this.state.loyBuildings).forEach((loyBuilding) => {
        if (this.isInPolygon((loyBuilding.xCoords).length, loyBuilding.xCoords, loyBuilding.yCoords, x, y)) { this.state.buildingDisplayName = loyBuilding.name; }
        this.state.campusDisplayName = 'Loyola';
      });
    } else {
      this.state.campusDisplayName = '';
      this.state.buildingDisplayName = '';
    }
  }

  render() {
    this.buildingName();

    return (
      <View style={styles.userFinalLoc}>
        <Text>{this.state.campusDisplayName}</Text>
        <Text>{this.state.buildingDisplayName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userFinalLoc: {
    marginBottom: 10,
    backgroundColor: 'pink',
  },
});
