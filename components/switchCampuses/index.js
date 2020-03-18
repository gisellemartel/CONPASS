import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, TouchableOpacity } from 'react-native-elements';
import styles from './styles';

export default class SwitchCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  /** Set the current map region to loyola campus. */
  setLoyola() {
    this.setState({
      region: {
        latitude: 45.458025,
        longitude: -73.640192,
      }
    }, () => { this.props.updateRegion(this.state.region); });
  }

  /** Set the current map region to SGW campus. */
  setSGW() {
    this.setState({
      region: {
        latitude: 45.495598,
        longitude: -73.577850,
      }
    }, () => { this.props.updateRegion(this.state.region); });
  }

  render() {
    if (this.props.visiblityState) {
      return (
        <View style={styles.container}>
          <View style={styles.buttonLeft}>
            <Button
              title="Loyola"
              onPress={() => { this.setLoyola(); }}
            />
          </View>

          <View style={styles.buttonRight}>
            <Button
              title="SGW"
              onPress={() => { this.setSGW(); }}
            />
          </View>
        </View>
      );
    }
    return null;
  }
}
