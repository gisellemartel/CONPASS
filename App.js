import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container} >
        <MapView initialRegion={{
          latitude: 45.492409,
          longitude: -73.582153,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }} style={styles.mapStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
