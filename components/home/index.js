import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Shuttle from '../shuttleInformation';
import SwitchCampuses from '../switchCampuses';
import WithinBuilding from '../withinBuilding';
import ToCircle from '../toCircle';
import Addresses from '../addresses';
import styles from './styles';


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
      // eslint-disable-next-line react/no-unused-state
      isSearchVisible: true,
      isGoVisible: false,
      isSwitchAvailableIndestination: true
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

  changeVisibilityTo = (visibility) => {
    this.setState({ isVisible: visibility });
  };

  changeVisibilityToSearch = (visibility) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isSearchVisible: visibility });
  };

  changeVisibilityToGo = (visibility) => {
    this.setState({ isGoVisible: visibility });
  }

  changeVisibilityToSwitchCampus = (visibility) => {
    this.setState({ isSwitchAvailableIndestination: visibility });
  }

  updateRegion2 = (newRegion2) => {
    this.setState({
      region2: {
        latitude: newRegion2.latitude,
        longitude: newRegion2.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  };

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
          isSwitchAvailableIndestination={this.state.isSwitchAvailableIndestination}
        />
        <WithinBuilding />
        <Shuttle
          coordinateCallback={this.updateCoordinates}
          getPolylinePoint={this.getPolylinePoint}
        />
        <ToCircle
          changeVisibilityToSwitchCampus={this.changeVisibilityToSwitchCampus}
          visibilityState={this.changeVisibilityToGo}
        />
        {this.state.isGoVisible
        && (
        <Addresses
          changeVisibilityToSwitchCampus={this.changeVisibilityToSwitchCampus}
          getRegion={this.getRegionFromAddresses}
          getCoordinates={this.getCoordinatesFromAddresses}
          visiblityState={this.changeVisibilityToGo}
        />
        ) }
      </View>
    );
  }
}

export default Home;
