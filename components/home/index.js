import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import styles from './styles';
import SwitchCampuses from '../switchCampuses';
import Building from '../map/building/index';
import generateBuilding from '../../assets/svgReactNative/buildingRepository';


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


  /**
   *
   * @param {*} newRegion -  a region object to be set to
   * Updates the currently set region to a new region
   */
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

  /**
   *
   * @param {*} visibility - boolean to set the visibility (false: unvisible)
   * Change the visiblity of the switchCampuses component
   */
  changeVisibilityTo = (visibility) => {
    this.setState({ isVisible: visibility });
  }

  /**
   *
   *  @param {*} newCoordinates - object with latitudes and longitudes
   * Updates coordinates state to draw polyline
   */
  updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
  }

  /**
   *
   * @param {*} data
   */
  getPolylinePoint = (data) => {
    this.setState({
      encryptedLine: data
    });
  }

  /**
   *
   * @param {*} building
   * @param {*} region
   * Activates interior mode when building is clicked on
   * Uses the building data to render floors
   */
  interiorModeOn(building, region) {
    this.setState({
      region,
      interiorMode: true,
      building
    });
  }

  /**
   *
   * Deactivates interior mode to return to outdoor map view
   */
  interiorModeOff() {
    this.setState({
      interiorMode: false,
      building: null
    });
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

        {/* Building component contains all the interior floor views */}
        {this.state.interiorMode
        && (
        <Building
          building={this.state.building}
          buildingFloorPlans={generateBuilding(this.state.building.building)}
          interiorModeOff={this.interiorModeOff}
        />
        )}
      </View>
    );
  }
}

export default Home;
