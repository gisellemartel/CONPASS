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
import BuildingView from '../../buildings/buildingView/index';
import generateFloorPlan from '../../buildings/floorPlans/floorPlanRepository';
import generateGraph from '../../../indoor_directions_modules/graphRepository';
import BackButton from '../backButton';
import BuildingInfoModal from '../../buildingInfoModal';
import PathPolyline from '../../pathPolyline';
import info from '../../../assets/icons/info.png';
import dijkstraPathfinder from '../../../indoor_directions_modules/dijkstraPathfinder';
import styles from './styles';
import { sendDirectionsToOutdoor } from '../../../store/actions';
import IndoorDestinationSearchBar from '../indoorDestinationSearchBar/index';


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
      mode: 'walking'
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

  /**
   * called when user clicks a building. Directions are set if navigation has been set
   */
  componentDidMount() {
    this.coordinatesFromOutside();
  }

  /**
   * called when user is within a building. Directions are updated
   */
  componentDidUpdate(prevProps) {
    const { startBuildingNode, endBuildingNode } = this.props;

    if (startBuildingNode !== prevProps.startBuildingNode) { // start input from within building changed
      if (startBuildingNode && endBuildingNode) { // both ready
        this.coordinatesFromInside(startBuildingNode, endBuildingNode); // initiate
      }
    } else if (endBuildingNode !== prevProps.endBuildingNode) { // start input from within building changed
      if (startBuildingNode && endBuildingNode) { // both ready
        this.coordinatesFromInside(startBuildingNode, endBuildingNode);
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
   * Finds the correct floor in the current adjacency graph
   * @param {*} currentBuilding - building we are currently located in
   * @param {*} floorNumber - floor we are searching for
   */
  findFloor(currentBuilding, floorNumber) {
    const floor = generateFloorPlan(currentBuilding.building).find((fl) => {
      return fl.floor.toString() === floorNumber.toString();
    });
    return floor;
  }

  /**
   *
   * @param {*} startBuildingNode
   * @param {*} endBuildingNode
   *
   * Triggers indoorDirection to initiate navigation from external source of directions
   */
  coordinatesFromInside(startBuildingNode, endBuildingNode) {
    const { currentBuilding } = this.state;

    const directions = {
      start: startBuildingNode,
      end: endBuildingNode
    };

    // from class to class same building
    if (currentBuilding.building === endBuildingNode.building) {
      this.setState({
        origin: startBuildingNode.dijkstraId,
        originFloor: this.findFloor(currentBuilding, startBuildingNode.floor),
      }, () => {
        this.dijkstraHandler(endBuildingNode.dijkstraId, endBuildingNode.floor);
      });
    } else { // from class to external point
      this.props.sendDirectionsToOutdoor(directions);
      this.setState({
        origin: startBuildingNode.dijkstraId,
        originFloor: this.findFloor(currentBuilding, startBuildingNode.floor),
      }, () => {
        this.dijkstraHandler(startBuildingNode.origin, 1);
        this.props.changeVisibilityTo(true);
      });
    }
  }

  /**
   * Triggers indoorDirection to initiate navigation from internal souce of directions
   */
  coordinatesFromOutside() {
    const { currentBuilding } = this.state;
    const { startBuildingNode, endBuildingNode } = this.props;

    if (startBuildingNode.building === currentBuilding.building) {
      const floor = this.findFloor(currentBuilding, 1);
      this.setState({
        origin: startBuildingNode.origin,
        originFloor: floor,
      }, () => { this.dijkstraHandler(startBuildingNode.dijkstraId, startBuildingNode.floor); });
    } else if (endBuildingNode.building === currentBuilding.building) {
      const floor = this.findFloor(currentBuilding, 1);
      this.setState({
        origin: endBuildingNode.origin,
        originFloor: floor,
      }, () => { this.dijkstraHandler(endBuildingNode.dijkstraId, endBuildingNode.floor); });
    }
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
    const [waypoints, graphs, floors] = this.indoorDirectionHandler(
      indoorDestination, indoorDestinationFloor
    );

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

  /**
   *
   * Obtains relevant info pertaining to coordinates, adjacency graphs, and floors
   * related to indoor directions between one indoor point to another
   * @param {*} indoorDestination - the indoor destination point
   * @param {*} indoorDestinationFloor - the floor that the indoor destination is found on
   */
  indoorDirectionHandler(indoorDestination, indoorDestinationFloor) {
    const { originFloor, origin } = this.state;
    const [startNodeId, startFloor] = [origin, originFloor.floor];
    const [finishNodeId, finishFloor] = [indoorDestination, indoorDestinationFloor];

    const adjacencyGraphs = generateGraph(this.state.currentBuilding.building);

    if (adjacencyGraphs[startFloor][startNodeId] !== undefined
      && adjacencyGraphs[finishFloor][finishNodeId] !== undefined) {
      if (startFloor.toString() === finishFloor.toString()) {
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
      // TODO: US4C will take care of finding the optimal meeting point.
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
            <View style={styles.iconsContainer}>
              <BackButton
                withRedux
                changeVisibilityTo={this.changeVisibilityTo}
                changePolylineVisibilityTo={this.changePolylineVisibilityTo}
                coordinateCallback={this.updateCoordinates}
              />
              <CurrentLocation />
              <Destination />
            </View>
            <View style={styles.directionsContainerBackground} />
            <View style={styles.searchContainer}>
              <IndoorMapSearchBar
                currentBuilding={currentBuilding}
                currentFloor={this.state.currentFloorPlan}
                indoorRoomsList={this.props.indoorRoomsList}
              />
              <IndoorDestinationSearchBar
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendDirectionsToOutdoor: (directions) => { dispatch(sendDirectionsToOutdoor(directions)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndoorDirections);
