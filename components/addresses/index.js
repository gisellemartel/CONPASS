/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';
import BackButton from './backButton';
import CurrentLocation from './currentLocation';
import Destination from './destination';
import Car from './car';
import Bus from './bus';
import Walking from './walking';
import Bike from './bike';
import styles from './styles';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Your Current Location',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      hide: true,
      drawPath: true
    };
  }

  drawPath =() => {
    this.setState((prevState) => { return { drawPath: !prevState.drawPath }; });
  }

  /**
  * updates region and passes the new region 'Home' component.
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
      this.props.getRegion(newRegion);
    };

    /**
    * updates coordinates and passes new coordinates 'Home' component.
    * @param {object} newCoordinates - New coordinates to be passed.
    */
    updateCoordinates = (newCoordinates) => {
      this.setState({
        coordinates: newCoordinates
      });
      this.props.getCoordinates(newCoordinates);
    };

    render() {
      return (
        <View style={styles.searchContainer}>
          <SearchBar
            updateRegion={this.updateRegion}
            urCurentLocation={this.state.value}
            hideMenu={this.state.hide}
            drawPath={this.drawPath}

          />
          <SearchBarDestination
            drawPath={this.state.drawPath}
            getRegionFromSearch={this.props.getRegionFromSearch}
            getDestinationIfSet={this.props.getDestinationIfSet}
            updatedRegion={this.state.region}
            coordinateCallback={this.updateCoordinates}
          />
          <Car />
          <Bus navigation={this.props.navigation} />
          <Bike />
          <Walking />
          <View style={styles.container}>
            <BackButton
              changeVisibilityTo={this.props.changeVisibilityTo}
              coordinateCallback={this.updateCoordinates}
            />
            <CurrentLocation />
            <Destination />
          </View>
        </View>


      );
    }
}
