/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import styles from './styles';
import SwitchCampuses from '../switchCampuses';
import ToCircle from '../toCircle';
import Addresses from '../addresses';
import Location from '../location';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
      isVisible: false,
      isSearchVisible: true,
      isGoVisible: false,
      isSwitchAvailableInDestination: true
    };
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
  };

  updateDestinationRegion = (newRegion) => {
    this.setState({
      region: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  };

  changeVisibilityTo = (visibility) => {
    this.setState({ isVisible: visibility });
  };

  changeVisibilityToSearch = (visibility) => {
    this.setState({ isSearchVisible: visibility });
  };

  changeVisibilityToGo = (visibility) => {
    this.setState({ isGoVisible: visibility });
  }

  changeVisibilityToSwitchCampus = (visibility) => {
    this.setState({ isSwitchAvailableIndestination: visibility });
  }

  updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
  };

  getPolylinePoint = (data) => {
    this.setState({
      encryptedLine: data
    });
  };

    getRegionFromAddresses=(region) => {
      this.updateRegion(region);
    };

  getCoordinatesFromAddresses=(coordinates) => {
    this.updateCoordinates(coordinates);
  }

  render() {
    return (
      <View style={styles.container}>
        <TheMap
          updatedRegion={this.state.region}
          updatedCoordinates={this.state.coordinates}
          encryptedLine={this.state.encryptedLine}
        />
        {!this.state.isGoVisible && (
        <SearchBar
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
          changeVisibilityToSearch={this.changeVisibilityToSearch}
        />
        )}
        <SwitchCampuses
          updateRegion={this.updateRegion}
          visiblityState={this.state.isVisible}
          isSwitchAvailableInDestination={this.state.isSwitchAvailableInDestination}
        />
        <ToCircle
          changeVisibilityToSwitchCampus={this.changeVisibilityToSwitchCampus}
          visibilityState={this.changeVisibilityToGo}
        />
        <Location updateRegion={this.updateRegion} />
        {this.state.isGoVisible
        && (
        <Addresses
          changeVisibilityToSwitchCampus={this.changeVisibilityToSwitchCampus}
          getRegion={this.getRegionFromAddresses}
          getCoordinates={this.getCoordinatesFromAddresses}
          visiblityState={this.changeVisibilityToGo}
          navigation={this.props.navigation}
        />
        ) }
      </View>
    );
  }
}

export default Home;
