/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Polygon, Polyline, PROVIDER_GOOGLE, } from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';


export default class TheMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
    this.state = {
      coordinate: {
        latitude: 45.492409,
        longitude: -73.582153,
      },
      coordinates: '',
      encryptedLine: ''
    };
  }

  componentDidMount() {
    const { description } = this.props.updatedRegion;
    this.setState({ region: description, mapRef: this.mapRef });
  }

  focusOnBuilding(coordinates) {
    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 10, right: 20, bottom: 10, left: 20
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={(ref) => { this.mapRef = ref; }}
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
          {buildings.map((building) => {
            return (
              building.polygons.map((polygon) => {
                return (
                  <CustomPolygon
                    key={polygon.name}
                    focusOnBuilding={this.focusOnBuilding}
                    coordinates={polygon.coordinates}
                    fillColor="rgba(255,135,135,0.5)"
                  />
                );
              })
            );
          })}
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

class CustomPolygon extends Component {
  zoomBuilding(coordinates) {
    this.props.focusOnBuilding(coordinates);
  }

  render() {
    return (
      <Polygon
        {...this.props}
        tappable
        onPress={() => {
          this.zoomBuilding(this.props.coordinates);
        }}
      />
    );
  }
}
