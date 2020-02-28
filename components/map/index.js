/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import MapView, { Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import decodePolyline from 'decode-google-map-polyline';

export default class TheMap extends Component {
  constructor(props) {
    super(props);
    const rawPolylinePoints = decodePolyline('qsmtGnrm`MuA|Eu@jC}@m@u@a@Sh@eAy@uA{@eGqEyG{EeHeFeFcEmDqCgBaBuI_IaCuBiCkBo@e@yAgA{KsJwGqFoF}EoFsE{EqEq@i@aAo@SAc@@[JMi@c@oA]q@c@k@gBuAk@c@KIPe@l@wAx@qAl@kAt@eAlAoAdByArBoBPU\\o@dBsBnAsBzDwHfCiFhBoE`BwEdCiHnDsJ@c@n@mBfDyJlFgPjAsDlAsELwALmD?}@AaAKaAE]OeAc@kBc@wAY}@[s@}@oA{@u@_@]YUk@s@sA{@u@[oAc@a@IKAUBUIgBe@kCs@kDcA{DiAmBs@{A{@qA{@}@s@uBuBiAwAmA{BeCuE_EiGsCkFmF_KkIwOoAwBcAcBYc@?SE[aCqEoA{ByAsCWa@a@_@w@c@gAe@]Uw@eAwDsF_CwCg@a@SKYGOA_@?a@FQFe@Rc@Z[\\SVsBgBiF_FoDiDqCiCoCiCKXcAbCcCxGyBnFiA~C');
    // Incompatible field names for direct decode. Need to do a small conversion.
    const waypoints = rawPolylinePoints.map((point) => {
      return {
        latitude: point.lat,
        longitude: point.lng
      };
    });
    this.state = {
      region: {
        latitude: 45.492409,
        longitude: -73.582153
      },
      coordinates: waypoints
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
            coordinates={this.state.coordinates}
            strokeWidth={4}
            strokeColor="blue"
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
