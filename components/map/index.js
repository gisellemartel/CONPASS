import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, } from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import CustomPolygon from './customPolygon';
import styles from './styles';

let region = '';

export default class TheMap extends Component {
  /**
 * Represents a map.
 * @constructor
 */
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      coordinate: {
        latitude: 45.492409,
        longitude: -73.582153,
      },
      nearbyMarkers: []
      coordinates: '',
      encryptedLine: '',
      interiorMode: false,
    };
    this.selectPoi = this.selectPoi.bind(this);
  }

  componentDidMount() {
    this.setState({ mapRef: this.mapRef },
      () => { this.fitScreenToPath(this.props.updatedCoordinates); });
  }

  componentDidUpdate(prevProps) {
    const coordinates = this.props.updatedCoordinates;
    if (prevProps.updatedCoordinates !== coordinates) {
      this.fitScreenToPath(coordinates);
    }
  }

  /** Resize the map to see the path */
  fitScreenToPath(coordinates) {
    this.state.mapRef.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 180, right: 20, bottom: 10, left: 20
      }
    });
  }

  /** Send the selected point of interest to the parent component */
  async selectPoi(poi) {
    const id = poi.nativeEvent.placeId;
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${id}`;
    if (id) {
      try {
        const georesult = await fetch(geoUrl);
        const gjson = await georesult.json();
        const address = gjson.result.formatted_address;
        const { name } = gjson.result;
        const locations = gjson.result.geometry.location;
        this.props.getDestinationIfSet(`${name}, ${address}`);
        this.props.updateRegionCloser({
          latitude: locations ? locations.lat : 45.492409,
          longitude: locations ? locations.lng : -73.582153,
        });
      } catch (err) {
        console.error(err);
      }
    }
    const { description } = this.props.updatedRegion;
    this.setState({ region: description, mapRef: this.mapRef });
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
    const { interiorMode } = this.state;
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
          onPoiClick={this.selectPoi}
        >
          {this.props.polylineVisibility
          && (
          <Polyline
            coordinates={this.props.updatedCoordinates}
            strokeWidth={4}
            strokeColor="black"
          />
          )}
          {buildings.map((building) => {
            return (
              <CustomPolygon
                key={building.buildingName + building.address}
                building={building}
                focusOnBuilding={this.focusOnBuilding}
                fillColor="rgba(255,135,135,0.5)"
              />
            );
          })}
          {
            // Add different colored marker at location if nothing is nearby
            this.props.nearbyMarkers.length > 0
              ? this.props.nearbyMarkers.map((marker) => {
                return (
                  <MapView.Marker
                    key={marker.id}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              }) : (
                <MapView.Marker
                  pinColor="#84ECED"
                  coordinate={{
                    latitude: this.props.updatedRegion.latitude,
                    longitude: this.props.updatedRegion.longitude
                  }}
                  title=""
                  description=""
                />
              )
          }

        </MapView>
      </View>
    );
  }
}
