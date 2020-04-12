import React, { Component } from 'react';
import {
  View, Text, ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, {
  Polyline
} from 'react-native-svg';
import styles from './styles';
import dijkstraPathfinder from '../../../../indoor_directions_modules/dijkstraPathfinder';


class BuildingWithFloors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.floor,
      directionPath: {}
    };
  }

  /**
   *
   * @param {*} lvl - desired floor level of selected building
   * Switches to lvl selected by floor switcher component
   */
  changeFloor(lvl) {
    const index = this.props.buildingFloorPlans.findIndex((i) => {
      return i.floor === lvl;
    });

    this.setState({
      floor: this.props.buildingFloorPlans[index]
    });

    this.props.changeCurrentFloorPlanTo(this.state.floor);
    this.dijkstraHandler('Male Bathroom', '967');
  }

  /**
   * Handles the processing of input before the Dijkstra algorithm is invoked. Currently checks if
   * the directions handle a single floor or multiple floors, then gives the directions based
   * on either scenario.
   * @param {Array} originInput - What the user inputs as the origin of indoor directions.
   * @param {Object} destinationInput - What the user inputs as the destination of indoor directions.
   */
  dijkstraHandler(originInput, destinationInput) {
    const updatedDirectionPath = {};
    let waypoints;
    let graphs;
    let floors;
    [waypoints, graphs, floors] = this.indoorDirectionHandler(originInput, destinationInput);
    if (waypoints.length > 0) {
      const paths = dijkstraPathfinder.dijkstraPathfinder(waypoints, graphs);
      for (let i = 0; i < paths.length; i++) {
        updatedDirectionPath[floors[i]] = paths[i];
      }
    }
    this.setState({
      directionPath: updatedDirectionPath
    });
  }

  indoorDirectionHandler(originInput, destinationInput) {
    const inputs = [];
    let startNodeId;
    let finishNodeId;
    let startFloor;
    let finishFloor;
    [startNodeId, startFloor] = this.inputParser(originInput);
    [finishNodeId, finishFloor] = this.inputParser(destinationInput);
    if (this.props.adjacencyGraphs[startFloor][startNodeId] !== undefined
      && this.props.adjacencyGraphs[finishFloor][finishNodeId] !== undefined) {
      if (startFloor == finishFloor) {
        return [[{ start: startNodeId, finish: finishNodeId }], [this.props.adjacencyGraphs[startFloor]], [startFloor]];
      }
      // Staircase 1 as default is temporary. US4C will take care of finding the optimal meeting point.
      return [[{ start: startNodeId, finish: 'staircase_1' }, { start: 'staircase_1', finish: finishNodeId }],
        [this.props.adjacencyGraphs[startFloor], this.props.adjacencyGraphs[finishFloor]],
        [startFloor, finishFloor]];
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
    const { floor } = this.state;
    return (
      <View style={styles.container}>
        {/* Renders floor switcher button for each available in current building */}
        <ScrollView zoomScale="0" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.switcher} scrollEnabled>
          {this.props.buildingFloorPlans.map((lvl) => {
            return (
              <View style={styles.textContainer} key={lvl.floor}>
                <TouchableOpacity
                  key={lvl.floor}
                  onPress={
                      () => {
                        return this.changeFloor(lvl.floor);
                      }
                    }
                >
                  <Text
                    key={lvl.floor}
                    style={styles.lvl}
                  >
                    {lvl.floor}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Renders map for current floor in building */}
        <View style={styles.buildingContainer}>
          {floor.component}
        </View>

        {/* Renders the needed svg path */}
        <View style={styles.buildingContainer}>
          <Svg width="100%" height="100%">
            <Polyline
              points={this.state.directionPath[this.state.floor.floor]}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          </Svg>
        </View>


      </View>
    );
  }
}

export default BuildingWithFloors;
