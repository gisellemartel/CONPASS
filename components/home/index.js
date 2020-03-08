import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Shuttle from '../shuttleInformation';
import SearchBarDestination from '../searchBarDestination';
import styles from './styles';
import SwitchCampuses from '../switchCampuses';
import WithinBuilding from '../withinBuilding';
import ToCircle from '../toCircle';
import Addresses from '../addresses';


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
      isGoVisible: false
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
    this.setState({ isSearchVisible: visibility });
  };

  changeVisibilityToGo = (visibility) => {
    this.setState({ isGoVisible: visibility });
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
        />

        <WithinBuilding />
        <Shuttle
          coordinateCallback={this.updateCoordinates}
          getPolylinePoint={this.getPolylinePoint}
        />

        {/* {this.state.isSearchVisible && (
        <SearchBarDestination
          changeVisibilityTo={this.changeVisibilityTo}

          updatedRegion={this.state.region}
          callBack2={this.updateRegion2}
          coordinateCallback={this.updateCoordinates}
          getPolylinePoint={this.getPolylinePoint}
        />
        )} */}
        <ToCircle
          visibilityState={this.changeVisibilityToGo}
        />
        {this.state.isGoVisible && <Addresses visiblityState={this.changeVisibilityToGo} /> }
      </View>
    );
  }
}

/**
 * Redux store listener. This function will update
 * the connected component state whenever the store updates.
 */
const mapStateToProps = (state) => {
  return { language: state.language };
};

export default connect(mapStateToProps)(Home);
