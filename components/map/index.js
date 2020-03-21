import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, {
  Polyline, PROVIDER_GOOGLE,
} from 'react-native-maps';
import CustomPolygon from './customPolygon';
import buildings from '../../assets/polygons/polygons';

import styles from './styles';


export default class TheMap extends Component {
  /**
 * Represents a map.
 * @constructor
 */
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
    };
  }

  componentDidMount() {
    this.setState({ mapRef: this.mapRef });
  }

  componentDidUpdate(prevProps) {
    const coordinates = this.props.updatedCoordinates;
    if (prevProps.updatedCoordinates !== coordinates) {
      this.fitScreenToPath(coordinates);
    }
  }


  getBuildingInformation= (building) => {
    this.props.getSuggestions(building);
  }


  fitScreenToPath(coordinates) {
    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 180, right: 20, bottom: 10, left: 20
      }
    });
  }

  render() {
    const buildingFocus = buildings.map((building) => {
      return (
        <CustomPolygon
          key={building.buildingName + building.address}
          building={building}
          getBuildingInformation={this.getBuildingInformation}
          focusOnBuilding={this.focusOnBuilding}
          fillColor="rgba(255,135,135,0.5)"
        />
      );
    });

    const currRef = (ref) => { this.mapRef = ref; };
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          ref={currRef}
          provider={PROVIDER_GOOGLE}
          key="map"
          region={this.props.updatedRegion}
          onRegionChange={this.onRegionChange}
          style={styles.mapStyle}
        >
          {this.props.polylineVisibility
          && (
          <Polyline
            coordinates={this.props.updatedCoordinates}
            strokeWidth={4}
            strokeColor="black"
          />
          )}
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
