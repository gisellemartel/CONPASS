import React, { Component } from 'react';
import { Polygon } from 'react-native-maps';

class CustomPolygon extends Component {
  /**
   * function focuses on building when selected on map
   */
  zoomBuilding() {
    const { building } = this.props;
    this.props.focusOnBuilding(building);
  }

  render() {
    const { building } = this.props;
    return (
      <Polygon
        coordinates={building.polygon.coordinates}
        strokeColor="rgba(0, 0, 0, 1)"
        strokeWidth={3}
        tappable
        onPress={() => {
          this.zoomBuilding();
        }}
      />
    );
  }
}

export default CustomPolygon;
