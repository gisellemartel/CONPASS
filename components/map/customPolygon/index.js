import React, { Component } from 'react';
import { Polygon } from 'react-native-maps';

class CustomPolygon extends Component {
  // zoomBuilding() {
  //   console.log('click');
  //   const { building } = this.props;
  //   this.props.focusOnBuilding(building);
  // }

  getBuildingInformation() {
    const { building } = this.props;
    this.props.getBuildingInformation(building);
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
          this.getBuildingInformation();
          // this.zoomBuilding();
        }}
      />
    );
  }
}

export default CustomPolygon;
