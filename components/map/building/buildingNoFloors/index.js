/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

class BuildingNoFloors extends Component {
  render() {
    return (
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

    );
  }
}

export default BuildingNoFloors;
