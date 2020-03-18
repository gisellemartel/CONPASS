import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Shuttle from '../shuttleInformation';
import styles from './styles';
import SwitchCampuses from '../switchCampuses';
import WithinBuilding from '../withinBuilding';
import Building from '../map/building/index';
import generateBuilding from '../../assets/svgReactNative/buildingRepository';
import Suggestions from '../suggestions';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      },
      isVisible: true,
      interiorMode: false,
    };
    this.interiorModeOn = this.interiorModeOn.bind(this);
    this.interiorModeOff = this.interiorModeOff.bind(this);
  }


  // Function : updates the currently set region to a new region
  // parameter : a region object to be set to
  updateRegion = (newRegion) => {
    this.setState({
      region: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  }

  // Function : change the visiblity of the switchCampuses component
  // parameter: boolean to set the visibility (false: unvisible)
  changeVisibilityTo = (visibility) => {
    this.setState({ isVisible: visibility });
  }

  // Function: Updates coordinates state to draw polyline
  // Parameter: object with latitudes and longitudes
  updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
  }

  getPolylinePoint = (data) => {
    this.setState({
      encryptedLine: data
    });
  }

  // Activates interior mode when building is clicked on
  // use the building data to render floors
  interiorModeOn(building, region) {
    this.setState({ region, interiorMode: true, building });
  }

  interiorModeOff() {
    this.setState({ interiorMode: false, building: null });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* zIndex=1 */}
        <TheMap
          updatedRegion={this.state.region}
          updatedCoordinates={this.state.coordinates}
          encryptedLine={this.state.encryptedLine}
          interiorModeOn={this.interiorModeOn}
        />
        {/* zIndex=5 */}
        <SearchBar
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
        />
        {/* zIndex=5 */}
        <SwitchCampuses updateRegion={this.updateRegion} visiblityState={this.state.isVisible} />
        {/* zIndex=5 */}
        {/* <WithinBuilding /> */}
        {/* <Shuttle
          coordinateCallback={this.updateCoordinates}
          getPolylinePoint={this.getPolylinePoint}
        /> */}
        {/* zIndex=2 */}
        {this.state.interiorMode && <Building building={this.state.building} buildingFloorPlans={generateBuilding(this.state.building.building)} interiorModeOff={this.interiorModeOff} />}
        <Suggestions />
      </View>
    );
  }
}

export default Home;
