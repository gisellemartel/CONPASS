import React, { Component } from 'react';
import { Polygon } from 'react-native-maps';

class CustomPolygon extends Component {
  
  zoomBuilding(coordinates) {
    this.props.focusOnBuilding(coordinates);
  }

  render() {
    console.log(this.props);
    const { coordinates } = this.props;
    return (
      <Polygon
        coordinates={coordinates}
        tappable
        onPress={() => {
          this.zoomBuilding(coordinates);
        }}
      />
    );
  }
}

export default CustomPolygon;
