import React, { Component } from 'react';
import { Polygon } from 'react-native-maps';

export default class BuildingPolygon extends Component {
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
