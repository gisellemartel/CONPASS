import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default class SwitchCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0
      },
      pressed: {
        pressedLeft: false,
        pressedRight: false
      },
    };
  }

  /** Set the current map region to loyola campus. */
  setLoyola() {
    this.setState(
      {
        region: {
          latitude: 45.458025,
          longitude: -73.640192
        },
        pressed: {
          pressedRight: true,
          pressedLeft: false
        }
      },
      () => {
        this.props.updateRegion(this.state.region);
      }
    );
  }

  /** Set the current map region to SGW campus. */
  setSGW() {
    this.setState(
      {
        region: {
          latitude: 45.495598,
          longitude: -73.57785
        },
        pressed: {
          pressedRight: false,
          pressedLeft: true
        }
      },
      () => {
        this.props.updateRegion(this.state.region);
      }
    );
  }

  render() {
    if (this.props.visiblityState) {
      return (
        <View style={styles.container}>

          <TouchableOpacity
            style={this.state.pressed.pressedLeft ? styles.buttonPressedLeft : styles.buttonLeft}
            onPress={() => {
              this.setSGW();
            }}
          >
            <Text style={styles.textStyle}>SGW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.state.pressed.pressedRight ? styles.buttonPressedRight : styles.buttonRight}
            onPress={() => {
              this.setLoyola();
            }}
          >
            <Text style={styles.textStyle}>Loyola</Text>
          </TouchableOpacity>

        </View>
      );
    }
    return null;
  }
}
