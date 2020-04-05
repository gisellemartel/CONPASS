import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurrentLocation from '../currentLocation';
import Destination from '../destination';
import buildingLogo from '../../../assets/icons/building.png';
import quit from '../../../assets/icons/quit.png';
import MapSearchBar from '../../mapSearchBar';
import DestinationSearchBar from '../destinationSearchBar';
import BuildingView from '../../buildings/buildingView/index';
import generateFloorPlan from '../../buildings/floorPlans/floorPlanRepository';
import generateGraph from '../../../indoor_directions_modules/graphRepository';
import BackButton from '../backButton';
import styles from './styles';

export default class IndoorDirections extends Component {
  /**
   * Exits Interior mode to return to external map view
   */
  interiorModeOff() {
    this.props.interiorModeOff();
  }

  /**
   *
   * @param {*} name - desired building name
   * Shortens the maximum length of the string to render
   */
  limitNameLength(name) {
    const maxLength = 24;
    const cutUpTo = 21;

    if (!name) {
      return '';
    }

    if (name.length > maxLength) {
      return `${name.substr(0, cutUpTo)}...`;
    }
    return name;
  }

  render() {
    const { building } = this.props;
    const buildingFloorPlans = generateFloorPlan(building.building);
    const adjacencyGraphs = generateGraph(building.building);
    return (
      <View style={styles.container}>
        {/* Top screen building descriptor */}
        <View style={styles.descriptor}>
          <View style={styles.buildingLogoContainer}>
            <Image style={styles.buildingLogo} source={buildingLogo} />
          </View>
          <View>
            <Text style={styles.buildingName}>
              {this.limitNameLength(building.buildingName)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.quitInterior}
            onPress={() => { return this.props.interiorModeOff(); }}
          >
            <Image style={styles.quitButton} source={quit} />
          </TouchableOpacity>
        </View>
        <View style={styles.buildingViewContainer}>
          <BuildingView
            building={building}
            buildingFloorPlans={buildingFloorPlans}
            adjacencyGraphs={adjacencyGraphs}
            interiorModeOff={this.props.interiorModeOff}
          />
        </View>
        <View style={styles.directionsContainer}>
          <BackButton
            changeVisibilityTo={this.props.changeVisibilityTo}
            coordinateCallback={this.updateCoordinates}
          />
          <CurrentLocation />
          <Destination />
        </View>

      </View>

    );
  }
}
