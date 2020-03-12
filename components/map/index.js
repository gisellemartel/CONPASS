/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, {
  Polygon, Polyline, PROVIDER_GOOGLE, Marker
} from 'react-native-maps';
import buildings from '../../assets/polygons/polygons';
import styles from './styles';


export default class TheMap extends Component {
  constructor(props) {
    super(props);
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
    this.setState({ region: description });
  }


  render() {
    return (
      <View style={styles.container}>
        <MapView

          provider={PROVIDER_GOOGLE}
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
                    coordinates={polygon.coordinates}
                    fillColor="rgba(255,135,135,0.5)"
                  />
                );
              })
            );
          })}

          <Marker
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

function CustomPolygon({ onLayout, ...props }) {
  const ref = React.useRef();

  function onLayoutPolygon() {
    if (ref.current) {
      ref.current.setNativeProps({ fillColor: props.fillColor });
    }
    // call onLayout() from the props if you need it
  }
  return <Polygon ref={ref} onLayout={onLayoutPolygon} {...props} />;
}
