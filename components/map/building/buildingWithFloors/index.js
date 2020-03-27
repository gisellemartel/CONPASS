/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Svg, {
  Polyline
} from 'react-native-svg';
import styles from './styles';
import buildingLogo from './building.png';
import quit from './quit.png';
import dijkstraPathfinder from './dijkstraPathfinder';


class BuildingWithFloors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.floor,
      directionPath: ''
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

  /**
   *
   * @param {*} name - desired building name
   * Shortens the maximum length of the string to render
   */
  limitNameLength(name) {
    const maxLength = 24;
    const cutUpTo = 21;

    if (name.length > maxLength) {
      return `${name.substr(0, cutUpTo)}...`;
    }
    return name;
  }

  render() {
    const { floor } = this.state;
    const { building } = this.props;
    return (
      <View style={styles.container}>
        {/* Top screen building descriptor */}
        <View style={styles.descriptor}>
          <View style={styles.buildingLogoContainer}>
            <Image style={styles.buildingLogo} source={buildingLogo} />
          </View>
          <View>
            <Text style={styles.buildingName}>
              {this.limitNameLength(building.buildingName)}
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
            <Image style={styles.quitButton} source={quit} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
                () => {
                  this.setState({
                    directionPath: dijkstraPathfinder.dijkstraPathfinder('817', '841', this.props.adjacencyGraph)
                  });
                }
              }
          >
            <Text>
              Get Directions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Renders map for current floor in building */}
        <View style={styles.buildingContainer}>
          {floor.component}
        </View>

        {/* Renders the needed svg path */}
        <View style={styles.buildingContainer}>
          <Svg width="100%" height="100%">
            <Polyline
              points={this.state.directionPath}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          </Svg>
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
