import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, } from 'react-native-maps';
import BuildingPolygon from './buildingPolygon';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';

export default class TheMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
  }

  componentDidMount() {
    this.setState({ mapRef: this.mapRef });
  }

  focusOnBuilding(coordinates) {
    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 10, right: 20, bottom: 10, left: 20
      }
    });
  }

  render() {
    const buildingFocus = buildings.map((building) => {
      return (
        building.polygons.map((polygon) => {
          return (
            <BuildingPolygon
              key={polygon.name}
              focusOnBuilding={this.focusOnBuilding}
              coordinates={polygon.coordinates}
              fillColor="rgba(255,135,135,0.5)"
            />
          );
        })
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
          style={styles.mapStyle}
        >
          <Polyline
            coordinates={this.props.updatedCoordinates ? this.props.updatedCoordinates : []}
            strokeWidth={4}
            strokeColor="black"
          />
          {buildingFocus()}
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
