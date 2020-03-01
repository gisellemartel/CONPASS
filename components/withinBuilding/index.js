import React, { Component } from 'react';
import {
  View, Text,
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
      location: '',

      // to display information
      fianlCampus: '',
      fianlBuilding: '',

      // polygon covering all buildings in SGW
      xSGWCoordinates: [-73.5866750, -73.5764890, -73.5715300, -73.5814433],
      ySGWCoordinates: [45.4963950, 45.4912630, 45.4961810, 45.5008758],

      // polygon covering all buildings in Loyola
      xLOYCoordinates: [-73.6465040, -73.6396194, -73.6330318, -73.6428850],
      yLOYCoordinates: [45.4572870, 45.4548085, 45.4581882, 45.4619310],

      // SGW buildings formatted for pnpoly use
      sgwBuildings: this.formatPolygonsObjs('SGW'),
      // Loyola buildings formatted for pnpoly use
      loyBuildings: this.formatPolygonsObjs('LOY')
    };
  }

  // retrieves the users' current location
  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

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
    return c;
  }

  // returns the name of building the user is currently located in
  async buildingName() {
    await this.getCurrentLocation();

    const { location } = this.state;
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
    }
  }

  render() {
    this.buildingName();

    return (
      <View style={styles.userFinalLoc}>
        <Text>{this.state.fianlCampus}</Text>
        <Text>{this.state.fianlBuilding}</Text>
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
