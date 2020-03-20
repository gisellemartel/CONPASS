import React, { Component } from "react";
import { View } from "react-native";
import { Button, TouchableOpacity } from "react-native-elements";
import styles from "./styles";

export default class SwitchCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0
      },
      pressed: {
        onPress: true
      }
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
          onPress: false
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
          onPress: true
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
          <View
            style={this.state.pressed ? styles.buttonLeft : styles.unPressed}
          >
            <Button
              title="Loyola"
              onPress={() => {
                this.setLoyola();
              }}
            />
          </View>

          <View
            style={this.state.pressed ? styles.buttonRight : styles.unPressed}
          >
            <Button
              title="SGW"
              onPress={() => {
                this.setSGW();
              }}
            />
          </View>
        </View>
      );
    }
    return null;
  }
}
