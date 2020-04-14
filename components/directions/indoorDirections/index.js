/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  View, Image, Text, Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
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


class IndoorDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBuilding: this.props.building,
      currentBuildingFloorPlans: [],
      currentFloorPlan: null,
      indoorDirectionsPolyLine: {},
      showDirectionsModal: false,
      drawPath: true,
      origin: '',
      originFloor: '',
      showPolyline: false,
      mode: 'walking',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    };

    if (this.state.currentBuilding) {
      this.state.currentBuildingFloorPlans = generateFloorPlan(this.state.currentBuilding.building);

      if (this.state.currentBuildingFloorPlans) {
        [this.state.currentFloorPlan] = this.state.currentBuildingFloorPlans;
      }
    }

    this.dijkstraHandler = this.dijkstraHandler.bind(this);
    this.indoorDirectionHandler = this.indoorDirectionHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.state.currentBuilding.building);
    const { startBuildingNode, endBuildingNode, navType } = this.props;
    // console.log(startBuildingNode);
    // console.log(endBuildingNode);
    // console.log(navType);
    this.prepareBuilding();
  }

  findFloor(currentBuilding, floorNumber) {
    const floor = generateFloorPlan(currentBuilding.building).find((fl) => {
      return fl.floor == floorNumber;
    });
    return floor;
  }

  prepareBuilding() {
    const { currentBuilding } = this.state;
    const { startBuildingNode, endBuildingNode, navType } = this.props;

    if (startBuildingNode.building === currentBuilding.building) {
      console.log('right start');
      // floorObject
      const floor = this.findFloor(currentBuilding, 1);

      this.setState({
        origin: startBuildingNode.origin,
        originFloor: floor,
      }, () => { this.dijkstraHandler(startBuildingNode.dijkstraId, startBuildingNode.floor); });
    } else if (endBuildingNode.building === currentBuilding.building) {
      // floor object
      const floor = this.findFloor(currentBuilding, 1);

      this.setState({
        origin: endBuildingNode.origin,
        originFloor: floor,
      }, () => { this.dijkstraHandler(endBuildingNode.dijkstraId, endBuildingNode.floor); }); // (string, int)
    }

    // if (navType === 'POI_TO_BUILDING') {
    //   this.setState({
    //     origin: endBuildingNode.origin,
    //     originFloor: floor,
    //   }, () => { this.dijkstraHandler(endBuildingNode.dijkstraId, endBuildingNode.floor); });
    // }
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
   * Changes visibility of directions polyline
   * @param {*} showPolyline - desired visibility boolean
   */
  changePolylineVisibilityTo = (showPolyline) => {
    this.setState({
      showPolyline
    });
  };

  /**
   * updates a draw path boolean. Draws a path when true
   */
  drawPath = () => {
    this.setState((prevState) => {
      return { drawPath: !prevState.drawPath };
    });
  };

  /**
   * Set the origin for indoor directions
   * @param {string} origin - name of origin
   */
  setOriginInput = (origin) => {
    this.setState({ origin });
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
   */
  dijkstraHandler(indoorDestination, indoorDestinationFloor) {
    const updatedDirectionPath = {};
    const [waypoints, graphs, floors] = this.indoorDirectionHandler(indoorDestination, indoorDestinationFloor);
    if (waypoints.length > 0) {
      const paths = dijkstraPathfinder.dijkstraPathfinder(waypoints, graphs);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < paths.length; i++) {
        updatedDirectionPath[floors[i]] = paths[i];
      }
    }
    this.setState({
      indoorDirectionsPolyLine: updatedDirectionPath,
      showDirectionsModal: false,
      showPolyline: true
    });
  }

  indoorDirectionHandler(indoorDestination, indoorDestinationFloor) {
    const { originFloor, origin } = this.state;
    const [startNodeId, startFloor] = [origin, originFloor.floor];
    const [finishNodeId, finishFloor] = [indoorDestination, indoorDestinationFloor];

    const adjacencyGraphs = generateGraph(this.state.currentBuilding.building);


    console.log(`start node: ${startNodeId} floor ${startFloor}`);
    console.log(`finish node: ${finishNodeId} floor ${finishFloor}`);

    if (adjacencyGraphs[startFloor][startNodeId] !== undefined
      && adjacencyGraphs[finishFloor][finishNodeId] !== undefined) {
      if (startFloor === finishFloor) {
        return [
          [
            {
              start: startNodeId,
              finish: finishNodeId
            }
          ],
          [
            adjacencyGraphs[startFloor]
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
          adjacencyGraphs[startFloor],
          adjacencyGraphs[finishFloor]
        ],
        [
          startFloor,
          finishFloor
        ]
      ];
    }
    return [[], [], []];
  }

  /**
   *
   * @param {*} input - input string to be parsed into format for djikstra
   */
  inputParser(input) {
    const globalRoomNumberRegex = /^\w-\d{3,}(\.\d{2})?$/i; // ex: H-837 (also H-837.05).
    const localRoomNumberRegex = /^\d{3,}(\.\d{2})?$/i; // above except w/o building code.
    const amenityRegex = /^\w+( \w+)*$/i; // Words and spaces.

    let id = '';
    let { floor } = this.state.currentFloorPlan.floor; // Assume current floor until input says otherwise.

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
            turnInteriorModeOff={this.props.turnInteriorModeOff}
            changeCurrentFloorPlanTo={this.changeCurrentFloorPlanTo}
            indoorDirectionsPolyLine={this.state.indoorDirectionsPolyLine}
            showPolyline={this.state.showPolyline}
          />
        </View>


        {/* Navigation button*/}
        {hasInteriorMode && (
          <PathPolyline changeVisibilityTo={this.changeVisibilityTo} />
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
              changePolylineVisibilityTo={this.changePolylineVisibilityTo}
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
                drawPath={this.state.drawPath}
                getRegionFromSearch={this.props.getRegionFromSearch}
                getDestinationIfSet={this.props.getDestinationIfSet}
                updatedRegion={this.state.region}
                coordinateCallback={this.props.getCoordinates}
                getMode={this.state.mode}
                indoorRoomsList={this.props.indoorRoomsList}
                currentBuildingName={currentBuilding.building}
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


const mapStateToProps = (state) => {
  return {
    endBuildingNode: state.endBuildingNode,
    startBuildingNode: state.startBuildingNode,
    navType: state.navType,
  };
};

export default connect(mapStateToProps)(IndoorDirections);
