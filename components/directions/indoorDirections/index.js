import React, { Component } from 'react';
import {
  View, Image, Text, Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurrentLocation from '../currentLocation';
import Destination from '../destination';
import buildingLogo from '../../../assets/icons/building.png';
import quit from '../../../assets/icons/quit.png';
import IndoorMapSearchBar from '../indoorMapSearchBar';
import DestinationSearchBar from '../destinationSearchBar';
import BuildingView from '../../buildings/buildingView/index';
import generateFloorPlan from '../../buildings/floorPlans/floorPlanRepository';
import generateGraph from '../../../indoor_directions_modules/graphRepository';
import BackButton from '../backButton';
import BuildingInfoModal from '../../buildingInfoModal';
import PathPolyline from '../../pathPolyline';
import info from '../../../assets/icons/info.png';

import styles from './styles';


export default class IndoorDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBuilding: this.props.building,
      currentBuildingFloorPlans: [],
      currentFloorPlan: null,
      showDirectionsModal: false,
      drawPath: true,
    };

    if (this.state.currentBuilding) {
      this.state.currentBuildingFloorPlans = generateFloorPlan(this.state.currentBuilding.building);

      if (this.state.currentBuildingFloorPlans) {
        [this.state.currentFloorPlan] = this.state.currentBuildingFloorPlans;
      }
    }
  }


  /**
   * Changes visibility of directions search menus depending on context
   * @param {*} showDirectionsMenu - desired visibility boolean
   */
  changeVisibilityTo = (showDirectionsModal) => {
    this.setState({
      showDirectionsModal
    });
  };

  /**
   * changes current floor plan to the one selected in BuildingView component
   * @param {object} - floorPlan to switch to
   */
  changeCurrentFloorPlanTo = (floorPlan) => {
    this.setState({
      currentFloorPlan: floorPlan
    });
  }

  /**
   * updates a draw path boolean. Draws a path when true
   */
  drawPath = () => {
    this.setState((prevState) => {
      return { drawPath: !prevState.drawPath };
    });
  };

  /**
   * Exits Interior mode to return to external map view
   */
  turnInteriorModeOff() {
    this.props.turnInteriorModeOff();
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
    const { currentBuilding } = this.state;
    const { currentBuildingFloorPlans } = this.state;
    const adjacencyGraphs = generateGraph(currentBuilding.building);
    const hasInteriorMode = !!currentBuildingFloorPlans;

    return (
      <View style={styles.container}>

        {/* Top screen building descriptor */}
        {hasInteriorMode && (
        <View style={styles.descriptor}>
          <View style={styles.buildingLogoContainer}>
            <Image style={styles.buildingLogo} source={buildingLogo} />
          </View>
          <View>
            <Text style={styles.buildingName}>
              {this.limitNameLength(currentBuilding.buildingName)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.quitInterior}
            onPress={() => { return this.props.turnInteriorModeOff(); }}
          >
            <Image style={styles.quitButton} source={quit} />
          </TouchableOpacity>
        </View>
        )}

        <View style={styles.buildingViewContainer}>
          <BuildingView
            building={currentBuilding}
            buildingFloorPlans={currentBuildingFloorPlans}
            adjacencyGraphs={adjacencyGraphs}
            turnInteriorModeOff={this.props.turnInteriorModeOff}
            changeCurrentFloorPlanTo={this.changeCurrentFloorPlanTo}
          />
        </View>


        {/* Navigation button*/}
        {hasInteriorMode && (
        <PathPolyline
          changeVisibilityTo={this.changeVisibilityTo}
        />
        )}

        {/* Building info button*/}
        {hasInteriorMode && (
        <View style={styles.buildingInfoButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              return this.props.setBuildingInfoModalVisibilityTo(true);
            }}
          >
            <Image style={styles.buildingInfoButton} source={info} />
          </TouchableOpacity>
        </View>
        )}

        {/* Indoor directions search view */}
        <Modal
          visible={this.state.showDirectionsModal}
          animationType="fade"
          transparent
        >
          <View style={styles.modalBackground} />
          <View style={styles.directionsContainer}>
            <BackButton
              changeVisibilityTo={this.changeVisibilityTo}
              coordinateCallback={this.updateCoordinates}
            />
            <CurrentLocation />
            <Destination />

            <IndoorMapSearchBar
              currentBuilding={currentBuilding}
              currentFloor={this.state.currentFloorPlan}
            />
            {/* <DestinationSearchBar
              drawPath={this.state.drawPath}
              getRegionFromSearch={this.props.getRegionFromSearch}
              getDestinationIfSet={this.props.getDestinationIfSet}
              updatedRegion={this.state.region}
              coordinateCallback={this.updateCoordinates}
              getMode={this.state.mode}
            /> */}
          </View>
        </Modal>

        <View style={styles.buildingInfoModalContainer}>
          {/* Building info pop-up*/}
          <BuildingInfoModal
            showBuildingInfoModal={this.props.showBuildingInfoModal}
            setBuildingInfoModalVisibilityTo={this.props.setBuildingInfoModalVisibilityTo}
            buildingInfoData={this.props.buildingInfoData}
            hasInteriorMode={hasInteriorMode}
            turnInteriorModeOff={this.props.turnInteriorModeOff}
          />
        </View>

      </View>

    );
  }
}
