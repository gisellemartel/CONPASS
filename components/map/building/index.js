/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.buildingFloorPlans[0]
    };
  }

  interiorModeOff() {
    this.props.interiorModeOff();
  }

  changeFloor(lvl) {
    const index = this.props.buildingFloorPlans.findIndex((i) => { return i.floor === lvl; });
    this.setState({ floor: this.props.buildingFloorPlans[index] });
  }

  render() {
    const { building } = this.props;
    const currentBuilding = building.polygon.name;
    const currentCampus = building.campus;

    const { floor } = this.state;
    return (
      (floor
        ? (
          <View style={styles.container}>
            <TouchableOpacity style={styles.quitButton} onPress={() => { return this.props.interiorModeOff(); }}>
              <Text>
                quit interior mode
              </Text>
            </TouchableOpacity>
            <View style={styles.buildingContainer}>
              {floor.component}
            </View>
            <View style={styles.switcher}>
              {this.props.buildingFloorPlans.map((lvl) => {
                return (
                  <TouchableOpacity onPress={() => { return this.changeFloor(lvl.floor); }}>
                    <Text style={styles.lvl}>
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
            <TouchableOpacity style={styles.quitButton} onPress={() => { return this.props.interiorModeOff(); }}>
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
