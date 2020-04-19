
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import MapSearchBar from '../mapSearchBar';
import Location from '../location';
import CampusToggle from '../campusToggle';
import PathPolyline from '../pathPolyline';
import OutdoorDirections from '../directions/outdoorDirections';
import IndoorDirections from '../directions/indoorDirections';
import fetchBuildingRooms from '../../indoor_directions_modules/fetchBuildingRooms';
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
      showBack: true,
      showCampusToggle: false,
      buildingInfoData: {},
      showBuildingInfoModal: false,
      indoorRoomsList: [],
      navigateFromCalender: false
    };
    this.turnInteriorModeOn = this.turnInteriorModeOn.bind(this);
    this.turnInteriorModeOff = this.turnInteriorModeOff.bind(this);
    this.setBuildingInfoModalVisibilityTo = this.setBuildingInfoModalVisibilityTo.bind(this);
    this.getCalDirections = this.getCalDirections.bind(this);
  }

  componentDidMount() {
    this.generateIndoorPredictionsForSearchBar();
    if (this.props.navigation.state) {
      this.getCalDirections();
    }
  }

  /**
   * Gets directions when getting directions from calender component
   */
   getCalDirections = () => {
     if (this.props.navigation.state.params.description) {
       this.setState({ destinationToGo: this.props.navigation.state.params.description });
       this.navigateFromCalender(true);
       this.changeVisibilityTo(true);
       this.changeVisibilityOfBack(false);
     }
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
   * Changes visibility of campus toggle when search bar is focused/blurred
   * @param {*} showCampusToggle - desired visibility boolean
   */
  setCampusToggleVisibility = (showCampusToggle) => {
    this.setState({
      showCampusToggle
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
   * @param {boolean} visibility
   */
  setBuildingInfoModalVisibilityTo(visibility) {
    this.setState({
      showBuildingInfoModal: visibility
    });
  }


  /**
   * Changes visibility of back button in outdoor directions component
   * @param {boolean} boolean - desired visibility boolean
   */
  changeVisibilityOfBack=(boolean) => {
    this.setState({ showBack: boolean });
  }

  /**
   * fetches all the possible indoor predictions for start point for any building and any floor
   */
  generateIndoorPredictionsForSearchBar = () => {
    const hallData = fetchBuildingRooms('H');
    const vlData = fetchBuildingRooms('VL');
    const indoorRoomsList = [];

    const hallRooms = Object.keys(hallData);
    const vlRooms = Object.keys(vlData);

    hallRooms.forEach((floor) => {
      hallData[floor].forEach((room) => {
        let roomString;
        const isNumeric = !isNaN(room);
        if (!isNumeric) {
          roomString = `H-${floor} ${room.toString().replace('_', ' ')}`;
        } else {
          roomString = `H-${room.toString()}`;
        }

        const currentAvailableRoom = {
          id: roomString,
          description: roomString,
          place_id: 'ChIJtd6Zh2oayUwRAu_CnRIfoBw',
          dijkstraId: room.toString(),
          building: 'H',
          // replace with official origin
          origin: 'north_exit',
          coordinates: {
            latitude: 45.497092,
            longitude: -73.578800,
          },
          floor,
        };
        indoorRoomsList.push(currentAvailableRoom);
      });
    });

    vlRooms.forEach((floor) => {
      vlData[floor].forEach((room) => {
        let roomString;
        const isNumeric = !isNaN(room);
        if (!isNumeric) {
          roomString = `VL-${floor} ${room.toString().replace('_', ' ')}`;
        } else {
          roomString = `VL-${room.toString()}`;
        }
        const currentAvailableRoom = {
          id: roomString,
          description: roomString,
          place_id: 'ChIJDbfcNjIXyUwRcocn3RuPPiY',
          dijkstraId: room.toString(),
          building: 'VL',
          origin: 'exit',
          coordinates: { latitude: 45.459026, longitude: -73.638606, },
          floor,
        };
        indoorRoomsList.push(currentAvailableRoom);
      });
    });

    this.setState({
      indoorRoomsList
    });
  }

  /**
   * Changes visibility of directions search menus depending on context
   * @param {*} showDirectionsMenu - desired visibility boolean
   */
  changeVisibilityTo = (showDirectionsMenu) => {
    this.setState({
      showDirectionsMenu
    });
  };

  updateCurrentBuildingAddress = (childCurrentBuilding) => {
    this.setState({
      currentBuildingAddress: childCurrentBuilding
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
   * updates the current boolean to know if the user is navigating from calendar or not
   * @param {boolean} boolean - Boolean to be passed in
   */
  navigateFromCalender(boolean) {
    this.setState({ navigateFromCalender: boolean });
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
          indoorRoomsList={this.state.indoorRoomsList}
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
            showBack={this.state.showBack}
            getDestinationIfSet={this.state.destinationToGo}
            getRegion={this.getRegionFromOutdoorDirections}
            getRegionFromSearch={this.state.region}
            navigateFromCalender={this.state.navigateFromCalender}
            getCoordinates={this.getCoordinatesFromOutdoorDirections}
            changeVisibilityTo={this.changeVisibilityTo}
            navigation={this.props.navigation}
            currentBuildingPred={this.state.currentBuildingAddress}
            indoorRoomsList={this.state.indoorRoomsList}
          />
        )}
        {/* Building component contains all the interior floor views */}
        {this.state.interiorMode
        && (
          <IndoorDirections
            getDestinationIfSet={this.state.destinationToGo}
            getRegion={this.getRegionFromOutdoorDirections}
            getRegionFromSearch={this.state.region}
            getCoordinates={this.getCoordinatesFromOutdoorDirections}
            building={this.state.building}
            showBuildingInfoModal={this.state.showBuildingInfoModal}
            setBuildingInfoModalVisibilityTo={this.setBuildingInfoModalVisibilityTo}
            turnInteriorModeOff={this.turnInteriorModeOff}
            buildingInfoData={this.state.buildingInfoData}
            changeVisibilityTo={this.changeVisibilityTo}
            indoorRoomsList={this.state.indoorRoomsList}
          />
        )}
      </View>
    );
  }
}
export default Home;
