import React, { Component } from 'react';
import {
  View, Text, ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, {
  Polyline
} from 'react-native-svg';
import styles from './styles';


class BuildingWithFloors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlan: this.props.floorPlan
    };
  }

  /**
   *
   * @param {*} lvl - desired floor level of selected building
   * Switches to lvl selected by floor switcher component
   */
  changeFloor(lvl) {
    const index = this.props.buildingFloorPlans.findIndex((i) => {
      return i.floor === lvl;
    });

    this.setState({
      floorPlan: this.props.buildingFloorPlans[index]
    });

    this.props.changeCurrentFloorPlanTo(this.state.floorPlan);
  }

  render() {
    const { floorPlan } = this.state;
    const { indoorDirectionsPolyLine } = this.props;

    return (
      <View style={styles.container}>
        {/* Renders floor switcher button for each available in current building */}
        <ScrollView zoomScale="0" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.switcher} scrollEnabled>
          {this.props.buildingFloorPlans.map((lvl) => {
            return (
              <View style={styles.textContainer} key={lvl.floor}>
                <TouchableOpacity
                  key={lvl.floor}
                  onPress={
                      () => {
                        return this.changeFloor(lvl.floor);
                      }
                    }
                >
                  <Text
                    key={lvl.floor}
                    style={styles.lvl}
                  >
                    {lvl.floor}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Renders map for current floor in building */}
        <View style={styles.buildingContainer}>
          {floorPlan.component}
        </View>

        {/* Renders the needed svg path */}
        <View style={styles.buildingContainer}>
          <Svg width="100%" height="100%">
            <Polyline
              points={indoorDirectionsPolyLine[floorPlan.floor]}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          </Svg>
        </View>


      </View>
    );
  }
}

export default BuildingWithFloors;
