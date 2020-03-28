/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View, Button, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BuildingWithFloors from './buildingWithFloors/index';
import BuildingNoFloors from './buildingNoFloors';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: this.props.buildingFloorPlans[0]
    };
  }

  render() {
    const { floor } = this.state;
    return (
      (floor ? <BuildingWithFloors floor={floor} {...this.props} />
        : (<BuildingNoFloors floor={floor} {...this.props} />)
      )
    );
  }
}

export default Building;
