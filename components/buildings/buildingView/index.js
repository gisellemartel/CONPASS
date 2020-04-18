import React, { Component } from 'react';
import { View } from 'react-native';
import BuildingWithFloors from './buildingWithFloors';
import styles from './styles';

class BuildingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlan: this.props.buildingFloorPlans[0]
    };
  }

  render() {
    const { floorPlan } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.indoorView}>
          {floorPlan && (
            <BuildingWithFloors
              floorPlan={floorPlan}
              buildingFloorPlans={this.props.buildingFloorPlans}
              changeCurrentFloorPlanTo={this.props.changeCurrentFloorPlanTo}
              indoorDirectionsPolyLine={this.props.indoorDirectionsPolyLine}
              showPolyline={this.props.showPolyline}
              {...this.props}
            />
          ) }
        </View>
      </View>
    );
  }
}

export default BuildingView;
