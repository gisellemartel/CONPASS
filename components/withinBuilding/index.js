/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
<<<<<<< HEAD
  View, Text,
=======
  View,
  Text,
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d
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
<<<<<<< HEAD
      location: '',

      // to display information
      fianlCampus: '',
      fianlBuilding: '',
=======
      location: {},

      // to display information
      campusDisplayName: '',
      buildingDisplayName: '',
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d

      // polygon covering all buildings in SGW
      xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
      ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],

      // polygon covering all buildings in Loyola
      xLOYCoordinates: [-73.6465040, -73.6396194, -73.6330318, -73.6428850],
      yLOYCoordinates: [45.4572870, 45.4548085, 45.4581882, 45.4619310],

<<<<<<< HEAD
      // SGW buildings formatted for pnpoly use
      sgwBuildings: this.formatPolygonsObjs('SGW'),
      // Loyola buildings formatted for pnpoly use
=======
      // SGW buildings formatted for isInPolygon use
      sgwBuildings: this.formatPolygonsObjs('SGW'),
      // Loyola buildings formatted for isInPolygon use
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d
      loyBuildings: this.formatPolygonsObjs('LOY')
    };
  }

  // retrieves the users' current location
  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
<<<<<<< HEAD
      console.error('Permission to access location was denied');
=======
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

<<<<<<< HEAD
  // Format SGW or Loyola buildings to be used by pnpoly function
  formatPolygonsObjs(campus) {
    if (campus !== 'SGW' && campus !== 'LOY') {
      return [];
    }

    const formattedBuildings = [];

    const formattedBuildingsTemp = buildings.filter((building) => {
      return building.campus === campus;
    });

    formattedBuildingsTemp.forEach((building) => {
      const xCoordinates = [];
      const yCoordinates = [];

      (building.polygons[0].coordinates).forEach((pairOfCoordinates) => {
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
  pnpoly(nvert, vertx, verty, testx, testy) {
    let i;
    let j;
    let c = false;

    for (i = 0, j = nvert - 1; i < nvert; j = i + 1) {
      if (((verty[i] > testy) !== (verty[j] > testy))
            // eslint-disable-next-line max-len
            && ((testx < (vertx[j] - vertx[i]) * (testy - verty[i])) / (verty[j] - verty[i]) + vertx[i])) {
        c = !c;
      }
    }
=======
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

      const buildingPolygon = building.polygons[0];

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
  isInPolygon(nvert, vertx, verty, testx, testy) {
    let i;
    let j;
    let c = false;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (((verty[i] > testy) !== (verty[j] > testy))
            && (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) { c = !c; }
    }
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d
    return c;
  }

  // returns the name of building the user is currently located in
  async buildingName() {
    await this.getCurrentLocation();

    const { location } = this.state;
<<<<<<< HEAD
    const x = location.coords.longitude;
    const y = location.coords.latitude;
    const { xSGWCoordinates } = this.state.xSGWCoordinates;
    const { ySGWCoordinates } = this.state.ySGWCoordinates;
    const { xLOYCoordinates } = this.state.xLOYCoordinates;
    const { yLOYCoordinates } = this.state.yLOYCoordinates;

    if (this.pnpoly((xSGWCoordinates).length, xSGWCoordinates, ySGWCoordinates, x, y)) {
      this.state.fianlCampus = 'SGW';
      this.state.fianlBuilding = '';
      (this.state.sgwBuildings).forEach((building) => {
        if (this.pnpoly((building.xCoords).length, building.xCoords, building.yCoords, x, y)) {
          this.state.fianlBuilding = building.name;
          this.state.fianlCampus = 'SGW';
        }
      });
    } else if (this.pnpoly((xLOYCoordinates).length, xLOYCoordinates, yLOYCoordinates, x, y)) {
      this.state.fianlCampus = 'Loyola';
      this.state.fianlBuilding = '';

      (this.state.loyBuildings).forEach((building) => {
        if (this.pnpoly((building.xCoords).length, building.xCoords, building.yCoords, x, y)) {
          this.state.fianlBuilding = building.name;
        }
        this.state.fianlCampus = 'Loyola';
      });
    } else {
      this.state.fianlCampus = '';
      this.state.fianlBuilding = '';
=======

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
      this.state.campusDisplayName = 'NONE';
      this.state.buildingDisplayName = 'NONE';
>>>>>>> 1cf70f139f050f1d462366d6a361444bea47124d
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
