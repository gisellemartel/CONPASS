import React, { Component } from 'react';
import {
  View, Image, Alert, Linking
} from 'react-native';
import i18n from 'i18n-js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as ExpoLocation from 'expo-location';
import styles from './styles';
import locateMe from './locate-me.png';

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  // Function: gets the current location of the user after grating permissions
  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.displayErrorAlert();
      return;
    }
    const location = await ExpoLocation.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    }, () => { this.props.updateRegion(this.state.region); });
  }


  // Method that will be called in the event that the user has their location services disabled
  displayErrorAlert() {
    Alert.alert(i18n.t('LOCATION_ALERT_TITLE'),
      i18n.t('LOCATION_ALERT_MESSAGE'),
      [
        { text: i18n.t('LOCATION_ALERT_BUTTON'), onPress: () => { Linking.openURL('app-settings:'); } }
      ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.getCurrentLocation();
          }}
        >
          <Image style={styles.location} source={locateMe} />
        </TouchableOpacity>
      </View>
    );
  }
}
