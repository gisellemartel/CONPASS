/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Location from '../location';
import SwitchCampuses from '../switchCampuses';
import Suggestions from '../suggestions';
// TODO: uncomment once #93 is merged
// import WithinBuilding from '../withinBuilding';
import SetPath from '../setPath';
import Addresses from '../addresses';
import styles from './styles';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      suggestion: {},
      value: '',
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
      isVisible: true,
      interiorMode: false,
      showDirectionsMenu: false,
      showCampusToggle: false
    };
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

  /**
   * Fetches the currently searched destination in order to automatically populate
   * destination option in directions mode
   * @param {object} destination - current selected destination
   */
  getDestinationIfSet = (destination) => {
    this.setState({ destinationToGo: destination });
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

  /**
   * Changes visibility of campus toggle when search bar is focused/blurred
   * @param {*} showCampusToggle - desired visibility boolean
   */
  setCampusToggleVisibility = (showCampusToggle) => {
    this.setState({
      showCampusToggle
    });
  }

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
  * gets new region from 'Addresses' component and updates region state
  * @param {object} region - New region to be passed.
  */
  getRegionFromAddresses=(region) => {
    this.updateRegion(region);
  };

  /**
  * gets new coordinates from 'Addresses' component and updates coordinates state
  * @param {object} coordinates - New coordinates to be passed.
  */
  getCoordinatesFromAddresses=(coordinates) => {
    this.updateCoordinates(coordinates);
  }


  getSuggestions = (suggestion) => {
    this.setState({
      suggestion,

    });
  }

  refresh=() => {
    this.setState({ refresh: true });
  }


  render() {
    return (
      <View style={styles.container}>
        <TheMap
          updatedCoordinates={this.state.coordinates}
          getSuggestions={this.getSuggestions}
          updatedRegion={this.state.presetRegion}
          polylineVisibility={this.state.showDirectionsMenu}
        />
        {!this.state.showDirectionsMenu && (
        <SearchBar
          getDestinationIfSet={this.getDestinationIfSet}
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
          setCampusToggleVisibility={this.setCampusToggleVisibility}
        />
        )}
        {this.state.showCampusToggle && (
        <SwitchCampuses
          updateRegion={this.updateRegion}
          visiblityState={!this.state.showDirectionsMenu}
        />
        )}
        <Location updateRegion={this.updateRegion} />
        <SetPath
          changeVisibilityTo={this.changeVisibilityTo}
          newValue={this.state.value}
        />
        {this.state.showDirectionsMenu
        && (
        <Addresses
          getDestinationIfSet={this.state.destinationToGo}
          getRegion={this.getRegionFromAddresses}
          getRegionFromSearch={this.state.region}
          getCoordinates={this.getCoordinatesFromAddresses}
          changeVisibilityTo={this.changeVisibilityTo}
          navigation={this.props.navigation}
        />
        ) }
        <Suggestions refresh={this.state.refresh} suggestion={this.state.suggestion} />

      </View>
    );
  }
}

export default Home;
