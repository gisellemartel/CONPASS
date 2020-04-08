
import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import MapSearchBar from '../mapSearchBar';
import Location from '../location';
import CampusToggle from '../campusToggle';
import PathPolyline from '../pathPolyline';
import OutdoorDirections from '../directions/outdoorDirections';
import IndoorDirections from '../directions/indoorDirections';
import styles from './styles';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      coordinates: [],
      region: {
        latitude: '',
        longitude: '',
        latitudeDelta: '',
        longitudeDelta: ''
      },
      presetRegion: {
        latitude: 45.492408,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
      interiorMode: false,
      nearbyMarkers: [],
      // current concordia bulding tapped on
      currentBuildingAddress: '',
      showDirectionsMenu: false,
      showCampusToggle: false,
      buildingInfoData: {},
      showBuildingInfoModal: false
    };
    this.turnInteriorModeOn = this.turnInteriorModeOn.bind(this);
    this.turnInteriorModeOff = this.turnInteriorModeOff.bind(this);
    this.hideBuildingInfoModal = this.hideBuildingInfoModal.bind(this);
  }


  /**
   * updates region and passes the new region 'map' component.
   * @param {object} newRegion - New region to be passed.
   */
  updateRegion = (newRegion) => {
    this.setState({
      presetRegion: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
    this.setState({
      region: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  };

  updateRegionCloser = (newRegion) => {
    this.setState({
      presetRegion: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
    });
    this.setState({
      region: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
    });
  }

  /**
   * Fetches the currently searched destination in order to automatically populate
   * destination option in directions mode
   * @param {object} destination - current selected destination
   */
  getDestinationIfSet = (destination) => {
    this.setState({ destinationToGo: destination });
  };

  /**
   * Changes visibility of directions search menus depending on context
   * @param {*} showDirectionsMenu - desired visibility boolean
   */
  changeVisibilityTo = (showDirectionsMenu) => {
    this.setState({
      showDirectionsMenu
    });
  };

  /**
   * Changes visibility of campus toggle when search bar is focused/blurred
   * @param {*} showCampusToggle - desired visibility boolean
   */
  setCampusToggleVisibility = (showCampusToggle) => {
    this.setState({
      showCampusToggle
    });
  };

  /**
   * updates coordinates and passes new coordinates 'Map' component.
   * @param {object} newCoordinates - New coordinates to be passed.
   */
  updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
  };

  /**
   * gets new region from 'OutdoorDirections' component and updates region state
   * @param {object} region - New region to be passed.
   */
  getRegionFromOutdoorDirections = (region) => {
    this.updateRegion(region);
  };

  /**
   * gets new coordinates from 'OutdoorDirections' component and updates coordinates state
   * @param {object} coordinates - New coordinates to be passed.
   */
  getCoordinatesFromOutdoorDirections = (coordinates) => {
    this.updateCoordinates(coordinates);
  };

  /**
   * gets marker objects created from the SearchBar component to nearbyMarker state.
   * Also being passed to the Map component
   * @param {object} markers - pins of nearby locations.
   *      markers [{
   *        id: string,
   *        title: string,
   *        description: string,
   *        coordinates: {
   *          latitude: number,
   *           longitude: number
   *         }
   *    }]
   *
   */

  getNearbyMarkers=(markers) => {
    this.setState({ nearbyMarkers: markers });
  }

  updateCurrentBuildingAddress = (childCurrentBuilding) => {
    this.setState({
      currentBuildingAddress: childCurrentBuilding
    });
  };

  /**
   * gets the curretly tapped on building information from 'map' component
   * @param {object} buildingInfoData - New coordinates to be passed.
   */
  getBuildingInfoData = (buildingInfoData) => {
    this.setState({
      buildingInfoData,
      showBuildingInfoModal: true
    });
  }


  /**
   * sets the visibility of showing the building information
   */
  hideBuildingInfoModal() {
    this.setState({
      showBuildingInfoModal: false
    });
  }


  /**
   *
   * @param {*} building
   * @param {*} region
   * Activates interior mode when building is clicked on
   * Uses the building data to render floors
   */
  turnInteriorModeOn(building, region) {
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
  turnInteriorModeOff() {
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
          updatedCoordinates={this.state.coordinates}
          encryptedLine={this.state.encryptedLine}
          turnInteriorModeOn={this.turnInteriorModeOn}
          updatedRegion={this.state.presetRegion}
          polylineVisibility={this.state.showDirectionsMenu}
          getDestinationIfSet={this.getDestinationIfSet}
          updateRegionCloser={this.updateRegionCloser}
          nearbyMarkers={this.state.nearbyMarkers}
          getBuildingInfoData={this.getBuildingInfoData}
        />
        {!this.state.showDirectionsMenu && (
        <MapSearchBar
          getDestinationIfSet={this.getDestinationIfSet}
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
          setCampusToggleVisibility={this.setCampusToggleVisibility}
          currentBuildingPred={this.state.currentBuildingAddress}
          nearbyMarkers={this.getNearbyMarkers}
        />
        )}
        {this.state.showCampusToggle && (
          <CampusToggle
            updateRegion={this.updateRegion}
            visiblityState={!this.state.showDirectionsMenu}
          />
        )}
        <Location
          updateRegion={this.updateRegion}
          updateCurrentBuildingCallBack={this.updateCurrentBuildingAddress}
        />
        <PathPolyline
          changeVisibilityTo={this.changeVisibilityTo}
        />
        {this.state.showDirectionsMenu && (
          <OutdoorDirections
            getDestinationIfSet={this.state.destinationToGo}
            getRegion={this.getRegionFromOutdoorDirections}
            getRegionFromSearch={this.state.region}
            getCoordinates={this.getCoordinatesFromOutdoorDirections}
            changeVisibilityTo={this.changeVisibilityTo}
            navigation={this.props.navigation}
            currentBuildingPred={this.state.currentBuildingAddress}
          />
        )}
        {/* Building component contains all the interior floor views */}
        {this.state.interiorMode
        && (
          <IndoorDirections
            building={this.state.building}
            showBuildingInfoModal={this.state.showBuildingInfoModal}
            hideBuildingInfoModal={this.hideBuildingInfoModal}
            turnInteriorModeOff={this.turnInteriorModeOff}
            buildingInfoData={this.state.buildingInfoData}
          />
        )}
      </View>
    );
  }
}
export default Home;
