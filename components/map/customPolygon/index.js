import React, { Component } from 'react';
import { Polygon } from 'react-native-maps';

class CustomPolygon extends Component {

  zoomBuilding() {
    const { building } = this.props;
    this.props.focusOnBuilding(building);
  }

  render() {
    const { building } = this.props;
    return (
      <Polygon
        coordinates={building.polygon.coordinates}
        tappable
        onPress={() => {
          this.zoomBuilding();
        }}
      />
    );
  }
}

export default CustomPolygon;
