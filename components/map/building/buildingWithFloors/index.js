/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import


class BuildingWithFloors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.floor
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
      <View style={styles.container}>
        <View style={styles.descriptor}>
          <View style={styles.buildingLogo}>
            <Image style={styles.currentLocation} source={destination} />
          </View>
          <View>
            <Text>
              Building
            </Text>
          </View>
          <TouchableOpacity
            style={styles.quitInterior}
            onPress={
                () => {
                  return this.props.interiorModeOff();
                }
              }
          >
            <img src="" alt=""/>
          </TouchableOpacity>
        </View>
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
    );
  }
}

export default BuildingWithFloors;
