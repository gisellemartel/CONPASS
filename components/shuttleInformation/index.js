import React, { Component } from 'react';
import { View, Button } from 'react-native';
import decodePolyline from 'decode-google-map-polyline';
import styles from './styles';


export default class Shuttle extends Component {
  async getDirections(origin, destination) {
    const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk';
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}`;
    try {
      const result = await fetch(directionUrl);
      const json = await result.json();
      const rawPolylinePoints = decodePolyline(json.routes[0].overview_polyline.points);
      // Incompatible field names for direct decode. Need to do a trivial conversion.
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
        <View style={styles.btn}>
          <Button
            title="Shuttle Bus Information"
            onPress={() => { console.log('Schedule to be provided soon.'); }}
          />
          <Button
            title="Get Shuttle Bus Directions"
            onPress={() => {
              this.getDirections(
                [45.459026, -73.638606],
                [45.497050, -73.578009]
              );
            }}
          />
        </View>
      </View>
    );
  }
}
