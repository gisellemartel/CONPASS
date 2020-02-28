import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

export default class Shuttle extends Component {
  async getDirections(origin, destination) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ origin, destination });
    const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk';
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=45.459026,-73.638606&destination=45.458493,-73.639287`;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <Button
            title="Shuttle Bus Information"
            onPress={() => { console.log("Schedule to be provided soon.") }}
          />
        </View>
      </View>
    );
  }
}
