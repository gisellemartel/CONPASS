/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';

export default class TheMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
    };
  }

  componentDidMount() {
    const { description } = this.props.updatedRegion;
    this.setState({ region: description });
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        region={this.props.updatedRegion}
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
