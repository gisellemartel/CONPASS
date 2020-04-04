import React, { Component } from 'react';
import { View } from 'react-native';
import CurrentLocation from '../currentLocation';
import Destination from '../destination';
import MapSearchBar from '../../mapSearchBar';
import DestinationSearchBar from '../destinationSearchBar';
import BuildingView from '../../buildings/buildingView/index';
import generateFloorPlan from '../../buildings/floorPlans/floorPlanRepository';
import generateGraph from '../../../indoor_directions_modules/graphRepository';
import BackButton from '../backButton';
import styles from './styles';

export default class IndoorDirections extends Component {
  render() {
    const { building } = this.props;
    const buildingFloorPlans = generateFloorPlan(building.building);
    const adjacencyGraphs = generateGraph(building.building);
    return (
      <View style={styles.container}>
        <BuildingView
          building={building}
          buildingFloorPlans={buildingFloorPlans}
          adjacencyGraphs={adjacencyGraphs}
          interiorModeOff={this.props.interiorModeOff}
        />
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
