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
import dijkstraPathfinder from '../../../indoor_directions_modules/dijkstraPathfinder';

import styles from './styles';


export default class IndoorDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBuilding: this.props.building,
      currentBuildingFloorPlans: [],
      currentFloorPlan: null,
      indoorDirectionsPolyLine: {},
      showDirectionsModal: false,
      drawPath: true,
      mode: 'walking',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
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

  /**
   * Handles the processing of input before the Dijkstra algorithm is invoked. Currently checks if
   * the directions handle a single floor or multiple floors, then gives the directions based
   * on either scenario.
   * @param {Array} originInput - What the user inputs as the origin of indoor directions.
   * @param {Object} destinationInput - What the user inputs as the destination of indoor directions
   */
  dijkstraHandler(originInput, destinationInput) {
    const updatedDirectionPath = {};
    const [waypoints, graphs, floors] = this.indoorDirectionHandler(originInput, destinationInput);
    if (waypoints.length > 0) {
      const paths = dijkstraPathfinder.dijkstraPathfinder(waypoints, graphs);
      for (let i = 0; i < paths.length; i++) {
        updatedDirectionPath[floors[i]] = paths[i];
      }
    }
    this.setState({
      indoorDirectionsPolyLine: updatedDirectionPath
    });
  }

  indoorDirectionHandler(originInput, destinationInput) {
    const [startNodeId, startFloor] = this.inputParser(originInput);
    const [finishNodeId, finishFloor] = this.inputParser(destinationInput);
    if (this.props.adjacencyGraphs[startFloor][startNodeId] !== undefined
      && this.props.adjacencyGraphs[finishFloor][finishNodeId] !== undefined) {
      if (startFloor === finishFloor) {
        return [
          [
            {
              start: startNodeId,
              finish: finishNodeId
            }
          ],
          [
            this.props.adjacencyGraphs[startFloor]
          ],
          [
            startFloor
          ]
        ];
      }
      // Staircase 1 as default is temporary.
      // US4C will take care of finding the optimal meeting point.
      return [
        [
          {
            start: startNodeId,
            finish: 'staircase_1'
          },
          {
            start: 'staircase_1',
            finish: finishNodeId
          }
        ],
        [
          this.props.adjacencyGraphs[startFloor],
          this.props.adjacencyGraphs[finishFloor]
        ],
        [
          startFloor,
          finishFloor
        ]
      ];
    }
    return [[], [], []];
  }

  inputParser(input) {
    const globalRoomNumberRegex = /^\w-\d{3,}(\.\d{2})?$/i; // ex: H-837 (also H-837.05).
    const localRoomNumberRegex = /^\d{3,}(\.\d{2})?$/i; // above except w/o building code.
    const amenityRegex = /^\w+( \w+)*$/i; // Words and spaces.

    let id = '';
    let { floor } = this.state.floor; // Assume current floor until input says otherwise.

    if (globalRoomNumberRegex.test(input) || localRoomNumberRegex.test(input)) {
      // Temporary: take current building until multi-building directions are complete.
      if (globalRoomNumberRegex.test(input)) {
        id = input.replace(/^\w-/, ''); // Snip the building code.
      } else {
        id = input;
      }
      floor = input.replace(/\d{0,2}(\.\d{2})?$/i, ''); // Snip all except the floor number.
    } else if (amenityRegex.test(input)) {
      id = input.replace(/ /g, '_').toLowerCase(); // Graph id's are denoted in lowercase and snake case.
      if (/^node_/i.test(id)) {
        // Do not allow directions to intermediate nodes.
        id = ' ';
      }
    }
    return [id, floor];
  }


  render() {
    const { currentBuilding } = this.state;
    const { currentBuildingFloorPlans } = this.state;
    const adjacencyGraphs = generateGraph(currentBuilding.building);
    const hasInteriorMode = currentBuildingFloorPlans.length > 0;

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
            indoorDirectionsPolyLine={this.state.indoorDirectionsPolyLine}
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
            <View style={styles.searchContainer}>
              <IndoorMapSearchBar
                currentBuilding={currentBuilding}
                currentFloor={this.state.currentFloorPlan}
              />
              <DestinationSearchBar
                style={styles.destinationSearchBar}
                drawPath={this.state.drawPath}
                getRegionFromSearch={this.props.getRegionFromSearch}
                getDestinationIfSet={this.props.getDestinationIfSet}
                updatedRegion={this.state.region}
                coordinateCallback={this.props.getCoordinates}
                getMode={this.state.mode}
                indoorRoomsList={this.props.indoorRoomsList}
              />
            </View>

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
