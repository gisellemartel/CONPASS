import React, { Component } from 'react';
import { View } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import BuildingWithFloors from './buildingWithFloors';
import BuildingNoFloors from './buildingNoFloors';
import styles from './styles';

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
      <View style={styles.container}>

        <ReactNativeZoomableView
          maxZoom={1.25}
          minZoom={1}
          zoomStep={0.05}
          initialZoom={1}
        >
          <View style={styles.indoorView}>
            {floor
              ? <BuildingWithFloors floor={floor} {...this.props} />
              : <BuildingNoFloors floor={floor} {...this.props} />}
          </View>
        </ReactNativeZoomableView>
      </View>

    );
  }
}

export default Building;
