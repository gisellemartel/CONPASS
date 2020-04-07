import React, { Component } from 'react';
import {
  View, Text
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

    console.log(this.indoorDirectionHandler('Steel Star Axe', '967')[0]);
  }

  /**
   * Handles the processing of input before the Dijkstra algorithm is invoked. Currently checks if
   * the directions handle a single floor or multiple floors, then gives the directions based
   * on either scenario.
   * @param {Array} startNodeId - ID of the node the directions start off at.
   * @param {Object} finishNodeId - ID of the node the directions start off at.
   */
  dijkstraHandler(startNodeId, finishNodeId) {
    // Need to account for room numbers that have decimals.
    const startFloor = parseInt(startNodeId.split('.')[0].slice(0, startNodeId.split('.')[0].length - 2), 10);
    const finishFloor = parseInt(finishNodeId.split('.')[0].slice(0, finishNodeId.split('.')[0].length - 2), 10);
    const updatedDirectionPath = {};
    if (startFloor !== finishFloor) {
      const paths = dijkstraPathfinder.dijkstraPathfinder(
        [{ start: startNodeId, finish: 'escalator' }, { start: 'escalator', finish: finishNodeId }],
        [this.props.adjacencyGraphs[startFloor], this.props.adjacencyGraphs[finishFloor]]
      );
      [updatedDirectionPath[startFloor], updatedDirectionPath[finishFloor]] = [paths[0], paths[1]];
    } else {
      const paths = dijkstraPathfinder.dijkstraPathfinder(
        [{ start: startNodeId, finish: finishNodeId }],
        [this.props.adjacencyGraphs[startFloor]]
      );
      [updatedDirectionPath[startFloor]] = [paths[0]];
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
      if (startFloor === finishFloor) {
        return [[{ start: startNodeId, finish: finishNodeId }], [this.props.adjacencyGraphs[startFloor]]];
      }
      // Staircase 1 as default is temporary. US4C will take care of finding the optimal meeting point.
      return [[{ start: startNodeId, finish: 'staircase_1' }, { start: 'staircase_1', finish: finishNodeId }],
        [this.props.adjacencyGraphs[startFloor], this.props.adjacencyGraphs[finishFloor]]];
    }
    return [[], []];
  }

  inputParser(input) {
    const globalRoomNumberRegex = /^\w-\d{3,}(\.\d{2})?$/i; // ex: H-837 (also H-837.05).
    const localRoomNumberRegex = /^\d{3,}(\.\d{2})?$/i; // above except w/o building code.
    const amenityRegex = /^\w+( \w+_*)$/i; // Words and spaces.

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
    }
    return [id, floor];
  }

  render() {
    const { floor } = this.state;
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={
                () => {
                  this.dijkstraHandler('817', '967');
                }
              }
        >
          <Text>
            Get Directions
          </Text>
        </TouchableOpacity> */}

        {/* Renders floor switcher button for each available in current building */}
        <View style={styles.switcher}>
          {this.props.buildingFloorPlans.map((lvl) => {
            return (
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
            );
          })}
        </View>

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
