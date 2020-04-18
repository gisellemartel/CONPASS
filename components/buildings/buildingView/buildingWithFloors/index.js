import React, { Component } from 'react';
import {
  View, Text, ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Svg, {
  Polyline
} from 'react-native-svg';
import styles from './styles';


class BuildingWithFloors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPlan: this.props.floorPlan,
      showScroller: true,
    };
  }

  zoomOutState = (event, gestureState, zoomableViewEventObject) => {
    if (zoomableViewEventObject.zoomLevel > 1) {
      this.setState({
        showScroller: false
      });
    } else {
      this.setState({
        showScroller: true
      });
    }
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

    const floorPlan = this.props.buildingFloorPlans[index];

    this.setState({
      floorPlan
    }, () => { this.props.changeCurrentFloorPlanTo(floorPlan); });
  }


  render() {
    const { floorPlan } = this.state;
    const { indoorDirectionsPolyLine } = this.props;

    return (
      <View style={styles.container}>
        {/* Renders floor switcher button for each available in current building */}
        {this.state.showScroller && (
        <ScrollView
          zoomScale="0"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.switcher}
          scrollEnabled
        >
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
        )}

        {/* Renders map for current floor in building */}
        <View style={styles.buildingContainer}>
          <ReactNativeZoomableView
            maxZoom={1.2}
            minZoom={1}
            zoomStep={0.05}
            initialZoom={1}
            onZoomAfter={this.zoomOutState}
          >
            {floorPlan.component}
          </ReactNativeZoomableView>
        </View>

        {/* Renders the needed svg path */}
        {indoorDirectionsPolyLine && this.props.showPolyline && (
        <View style={styles.buildingContainer}>
          <Svg width="100%" height="100%">
            <Polyline
              points={indoorDirectionsPolyLine[floorPlan.floor]}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </Svg>
        </View>
        )}


      </View>
    );
  }
}

export default BuildingWithFloors;
