
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getCurrentLocation from './LocationServices';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';
import locateMe from './locate-me.png';

export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // to display information
      campusDisplayName: '',
      buildingDisplayName: '',

      // polygon covering all buildings in SGW
      xSGWCoordinates: [-73.586675, -73.576489, -73.57153, -73.5814433],
      ySGWCoordinates: [45.496395, 45.491263, 45.496181, 45.5008758],

      // polygon covering all buildings in Loyola
      xLOYCoordinates: [-73.646504, -73.6396194, -73.6330318, -73.642885],
      yLOYCoordinates: [45.457287, 45.4548085, 45.4581882, 45.461931],

      // SGW buildings formatted for isInPolygon use
      sgwBuildings: this.formatPolygonsObjs('SGW'),
      // Loyola buildings formatted for isInPolygon use
      loyBuildings: this.formatPolygonsObjs('LOY')
    };
  }

  /** @param {string} campus - either 'SGW' or 'LOY'
   *  Format SGW or Loyola buildings to be used by isInPolygon function */
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

      buildingPolygon.coordinates.forEach((pairOfCoordinates) => {
        xCoordinates.push(pairOfCoordinates.longitude);
        yCoordinates.push(pairOfCoordinates.latitude);
      });

      formattedBuildings.push({
        name: building.buildingName,
        address: building.address,
        xCoords: xCoordinates,
        yCoords: yCoordinates
      });
    });

    return formattedBuildings;
  }

  /** @param {number} nvert
   * @param {number} vertx
   * @param {number} verty
   * @param {number} testx
   * @param {number} testy
   * Finds if a pair of coordinates are inside a polygon
   * Algorithm comes from: https://stackoverflow.com/questions/11716268/point-in-polygon-algorithm?lq=1
   * Date Consulted: February 29th, 2020 */
  isInPolygon(nvert, vertx, verty, testx, testy) {
    let i;
    let j;
    let c = false;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (
        verty[i] > testy !== verty[j] > testy
        && testx
          < ((vertx[j] - vertx[i]) * (testy - verty[i])) / (verty[j] - verty[i])
            + vertx[i]
      ) {
        c = !c;
      }
    }
    return c;
  }

  /** @async
   * Will update the view to position the map at the user's current location
   *and Returns the name of building the user is currently located in (if the user is on campus) */
  async locateMe() {
    await getCurrentLocation(this);

    const x = this.state.region.longitude;
    const y = this.state.region.latitude;
    if (
      this.isInPolygon(
        this.state.xSGWCoordinates.length,
        this.state.xSGWCoordinates,
        this.state.ySGWCoordinates,
        x,
        y
      )
    ) {
      this.setState({
        campusDisplayName: 'SGW',
        buildingDisplayName: ''
      });
      this.state.sgwBuildings.forEach((sgwBuilding) => {
        if (
          this.isInPolygon(
            sgwBuilding.xCoords.length,
            sgwBuilding.xCoords,
            sgwBuilding.yCoords,
            x,
            y
          )
        ) {
          this.setState({
            buildingDisplayName: sgwBuilding.name,
            campusDisplayName: 'SGW'
          });
        }
      });
    } else if (
      this.isInPolygon(
        this.state.xLOYCoordinates.length,
        this.state.xLOYCoordinates,
        this.state.yLOYCoordinates,
        x,
        y
      )
    ) {
      this.setState({
        campusDisplayName: 'Loyola',
        buildingDisplayName: ''
      });
      this.state.loyBuildings.forEach((loyBuilding) => {
        if (
          this.isInPolygon(
            loyBuilding.xCoords.length,
            loyBuilding.xCoords,
            loyBuilding.yCoords,
            x,
            y
          )
        ) {
          this.setState({
            buildingDisplayName: loyBuilding.name,
            campusDisplayName: 'Loyola'
          });
          // this.state.buildingDisplayName = loyBuilding.name;
        }
        // this.state.campusDisplayName = 'Loyola';
      });
    } else {
      this.setState({
        campusDisplayName: '',
        buildingDisplayName: ''
      });
      /* this.state.campusDisplayName = '';
      this.state.buildingDisplayName = '';*/
    }

    this.updateCurrentBuildingProp();
  }

  /**
   * Updates currentBuilding prop passed from Home component
   */
  updateCurrentBuildingProp() {
    let buildingAddress = '';
    if (
      this.state.campusDisplayName === 'Loyola'
      && this.state.buildingDisplayName.length > 0
    ) {
      buildingAddress = this.state.loyBuildings.filter((building) => {
        return building.name === this.state.buildingDisplayName;
      })[0].address;
      this.props.updateCurrentBuildingCallBack(buildingAddress);
    } else if (
      this.state.campusDisplayName === 'SGW'
      && this.state.buildingDisplayName.length > 0
    ) {
      buildingAddress = this.state.sgwBuildings.filter((building) => {
        return building.name === this.state.buildingDisplayName;
      })[0].address;
      this.props.updateCurrentBuildingCallBack(buildingAddress);
    } else {
      this.props.updateCurrentBuildingCallBack(buildingAddress);
    }

    return buildingAddress;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.locateMe();
          }}
        >
          <Text>{this.state.campusDisplayName}</Text>
          <Text>{this.state.buildingDisplayName}</Text>
          <Image style={styles.location} source={locateMe} />
        </TouchableOpacity>
      </View>
    );
  }
}
