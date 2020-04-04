import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import buildingLogo from '../../../assets/icons/building.png';
import quit from '../../../assets/icons/quit.png';
import BuildingWithFloors from './buildingWithFloors';
import BuildingNoFloors from './buildingNoFloors';
import styles from './styles';

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
            onPress={() => { return this.props.interiorModeOff(); }}
          >
            <Image style={styles.quitButton} source={quit} />
          </TouchableOpacity>
        </View>
        <ReactNativeZoomableView
          maxZoom={1.25}
          minZoom={1}
          zoomStep={0.05}
          initialZoom={1}
        >
          <View style={styles.indoorView}>
            {floor
              ? <BuildingWithFloors floor={floor} {...this.props} />
              : <BuildingNoFloors floor={floor} {...this.props} />}
          </View>
        </ReactNativeZoomableView>
      </View>

    );
  }
}

export default Building;
