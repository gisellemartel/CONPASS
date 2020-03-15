/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text
} from 'react-native';
import styles from './styles';

import CC1 from '../../../assets/svg/cc-1.svg';
import Hall1 from '../../../assets/svg/hall-1.svg';
import Hall2 from '../../../assets/svg/hall-2.svg';
import Hall8 from '../../../assets/svg/hall-8.svg';
// import Hall9 from '../../../assets/svg/hall-9.svg';
import MB1 from '../../../assets/svg/mb-1.svg';
import MBS2 from '../../../assets/svg/mb-s2.svg';
import VE1 from '../../../assets/svg/ve-1.svg';
import VE2 from '../../../assets/svg/ve-2.svg';
import VL1 from '../../../assets/svg/vl-1.svg';
import VL2 from '../../../assets/svg/vl-2.svg';

class Building extends Component {
  interiorModeOff() {
    this.props.interiorModeOff();
  }

  whichBuilding(name) {
    switch (name) {
      case 'H':
        return <Hall1 width={250} height={250} />;
      case 'MB':
        return <MB1 width={250} height={250} />;
      case 'VE':
        return <VE1 width={250} height={250} />;
      case 'VL':
        return <VL1 width={250} height={250} />;
      case 'CC':
        return <CC1 width={250} height={250} />;
      default:
        return null;
    }
  }

  whichFloor(floor) {

  }

  render() {
    const { building } = this.props;
    const currentBuilding = building.polygon.name;
    const currentCampus = building.campus;

    const buildingSvg = this.whichBuilding(building.building);

    return (
      (buildingSvg
        ? (
          <View style={styles.container}>
            {buildingSvg}
            <View style={{ width: 50, height: 50 }} />
            <View style={styles.buildingInfo}>
              <Button title="quit" onPress={() => { this.interiorModeOff(); }} />
              <Text>Interior Mode</Text>
              <Text>
                {currentBuilding}
              </Text>
              <Text>
                {currentCampus}
              </Text>
            </View>
          </View>
        ) : null)
    );
  }
}

export default Building;
