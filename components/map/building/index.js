/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import dijkstraPathfinder from './dijkstraPathfinder';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.buildingFloorPlans[0]
    };
  }

  /**
   * Exits Interior mode to return to external map view
   */
  interiorModeOff() {
    this.props.interiorModeOff();
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
  }

  render() {
    const { floor } = this.state;

    return (
      (floor
        ? (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.quitButton}
              onPress={
                () => {
                  return this.props.interiorModeOff();
                }
              }
            >
              <Text>
                return
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={
                () => {
                  console.log(dijkstraPathfinder.dijkstraPathfinder());
                }
              }
            >
              <Text>
                Get Directions
              </Text>
            </TouchableOpacity>

            {/* Renders map for current floor in building */}
            <View style={styles.buildingContainer}>
              {floor.component}
            </View>

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
          </View>
        )
        : (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => {
                return this.props.interiorModeOff();
              }}
            >
              <Text>
                no floors available, press to quit
              </Text>
            </TouchableOpacity>
          </View>
        ))
    );
  }
}

export default Building;
