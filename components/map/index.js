import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, } from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import CustomPolygon from './customPolygon';
import styles from './styles';

let region = '';

export default class TheMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    this.setState({ mapRef: this.mapRef });
  }

  onRegionChange(newRegion) {
    region = newRegion;
  }

  focusOnBuilding(building) {
    const { coordinates } = building.polygon;

    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 10, right: 20, bottom: 10, left: 20
      }
    });

    // they do not provide a callback when the fitToCoordinates is complete.
    // Setting at timer for the animation to finish
    setTimeout(() => {
      const getRegion = region;
      this.props.interiorModeOn(building, getRegion);
    }, 500);
  }


  // do not put conponents that dont belong to react-native-maps API inside the MapView
  render() {
    const buildingFocus = buildings.map((building) => {
      return (
        <CustomPolygon
          key={building.buildingName + building.address}
          building={building}
          focusOnBuilding={this.focusOnBuilding}
          fillColor="rgba(255,135,135,0.5)"
        />
      );
    });

    const currRef = (ref) => { this.mapRef = ref; };

    return (
      <View style={styles.container}>
        <MapView
          ref={currRef}
          provider={PROVIDER_GOOGLE}
          key="map"
          region={this.props.updatedRegion}
          onRegionChange={this.onRegionChange}
          style={styles.mapStyle}
        >
          <Polyline
            coordinates={this.props.updatedCoordinates ? this.props.updatedCoordinates : []}
            strokeWidth={4}
            strokeColor="black"
          />
          {buildingFocus}
          <MapView.Marker
            coordinate={{
              latitude: this.props.updatedRegion.latitude,
              longitude: this.props.updatedRegion.longitude
            }}
            title="title"
            description="description"
          />
        </MapView>
      </View>
    );
  }
}
