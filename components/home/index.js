import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import Shuttle from '../shuttleInformation';
import styles from './styles';
import SwitchCampuses from '../switchCampuses';
import WithinBuilding from '../withinBuilding';
import Building from '../map/building/index';

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
    this.setBuilding = this.setBuilding.bind(this);
  }

  setBuilding(building, region) {
    console.log(building, region);
    this.setState({region, interiorMode: true});
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


  render() {
    return (
      <View style={styles.container}>
        <TheMap
          updatedRegion={this.state.region}
          updatedCoordinates={this.state.coordinates}
          encryptedLine={this.state.encryptedLine}
          setBuilding={this.setBuilding}
        />
        <SearchBar
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
        />
        <SwitchCampuses updateRegion={this.updateRegion} visiblityState={this.state.isVisible} />
        <WithinBuilding />
        <Shuttle
          coordinateCallback={this.updateCoordinates}
          getPolylinePoint={this.getPolylinePoint}
        />
        {this.state.interiorMode && <Building />}
      </View>
    );
  }
}

export default Home;
