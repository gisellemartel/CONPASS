/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import {
  View, Button, Alert
} from 'react-native';
import decodePolyline from 'decode-google-map-polyline';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import shuttleLocationInformation from './shuttleLocationService';
import styles from './styles';

export default class Shuttle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.getCurrentLocation();
  }

  // eslint-disable-next-line max-len
  // Function: fetches the current location of the user, gets the shuttle bus location of SGW or Loyola, calls the draw function
  // Parameter: SGW or Loyola String
  async getDirectionsToShuttleBusStop(destination) {
    await this.getCurrentLocation();
    const { location } = this.state;
    let destCoordinates = [];
    if (destination === 'SGW') { destCoordinates = [shuttleLocationInformation[0].latitude, shuttleLocationInformation[0].longitude]; } else if (destination === 'LOY') { destCoordinates = [shuttleLocationInformation[1].latitude, shuttleLocationInformation[1].longitude]; }
    await this.drawPath([location.coords.latitude, location.coords.longitude], destCoordinates);
  }

  // Function: gets the current location of the user after grating permissions
  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.displayErrorAlert();
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // Function: Draws a polyline on the map from an origin to a destination
  // Parameter: origin point and desired destination as an array of lat,long
  async drawPath(origin, destination) {
    const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk';
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}`;
    try {
      const result = await fetch(directionUrl);
      const json = await result.json();
      // const encryptedPath = json.routes[0].overview_polyline.points;
      // const { getPolylinePoint } = this.props;
      const rawPolylinePoints = decodePolyline(json.routes[0].overview_polyline.points);
      // Incompatible field names for direct decode. Need to do a trivial conversion
      const waypoints = rawPolylinePoints.map((point) => {
        return {
          latitude: point.lat,
          longitude: point.lng
        };
      });
      const { coordinateCallback } = this.props;
      coordinateCallback(waypoints);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Get Shuttle Bus Directions"
          onPress={() => {
            Alert.alert(
              'Select the Campus',
              'Which campus would you like to get directions to the Shuttle Bus Stop?',
              [
                { text: 'SGW', onPress: () => { this.getDirectionsToShuttleBusStop('SGW'); } },
                { text: 'LOY', onPress: () => { this.getDirectionsToShuttleBusStop('LOY'); } }
              ],
              { cancelable: false }
            );
          }}
        />

      </View>
    );
  }
}
