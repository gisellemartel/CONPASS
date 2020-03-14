import React, { Component } from 'react';
import {
  View, Button, Text
} from 'react-native';
import styles from './styles';

class Building extends Component {
  interiorModeOff() {
    this.props.interiorModeOff();
  }

  render() {
    const { building } = this.props;
    return (
      <View style={styles.container}>
        <Text>Interior Mode: On</Text>
        <Text>
          building:
          {building.buildingName}
        </Text>
        <Text>
          campus:
          {building.campus}
        </Text>

        <Button title="quit" onPress={() => { this.interiorModeOff(); }} />
      </View>
    );
  }
}

export default Building;
