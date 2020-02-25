import React, { Component } from 'react';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';

export default class TheMap extends Component {
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 45.492409,
          longitude: -73.582153,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.mapStyle}
      >

        {buildings.map((building) => {
          return (
            building.polygons.map((polygon) => {
              return (
                <Polygon
                  key={polygon.name}
                  coordinates={polygon.coordinates}
                  fillColor="rgba(255,135,135,0.5)"
                />
              );
            })
          );
        })}
      </MapView>
    );
  }
}
