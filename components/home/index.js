import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Shuttle from '../shuttleInformation';
import SwitchCampuses from '../switchCampuses';
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
      value: '',
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
      showDirectionsMenu: false,
      coordinates: []
    };
  }

  /**
  * updates region and passes the new region 'map' component.
  * @param {object} newRegion - New region to be passed.
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
  };

  changeVisibilityTo = (showDirectionsMenu) => {
    this.setState({
      showDirectionsMenu
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

  /**
  * gets path to be deleted from 'Addresses' component
  * @param {object} setPath - path to be deleted.
  */
  clearPath = () => {
    this.setState({
      coordinates: []
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TheMap
          updatedRegion={this.state.region}
          updatedCoordinates={this.state.coordinates}
          polylineVisibility={this.state.showDirectionsMenu}
        />
        {!this.state.showDirectionsMenu && (
        <SearchBar
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
        />
        )}
        {!this.state.showDirectionsMenu && (
        <SwitchCampuses
          updateRegion={this.updateRegion}
          visiblityState={!this.state.showDirectionsMenu}
        />
        )}
        {/* TODO: uncomment once #93 is merged */}
        {/* <WithinBuilding /> */}
        <Shuttle
          coordinateCallback={this.updateCoordinates}
        />
        <SetPath
          changeVisibilityTo={this.changeVisibilityTo}
          newValue={this.state.value}
        />
        {this.state.showDirectionsMenu
        && (
        <Addresses
          clearPath={this.clearPath}
          getRegion={this.getRegionFromAddresses}
          getCoordinates={this.getCoordinatesFromAddresses}
          changeVisibilityTo={this.changeVisibilityTo}
        />
        ) }
      </View>
    );
  }
}

export default Home;
