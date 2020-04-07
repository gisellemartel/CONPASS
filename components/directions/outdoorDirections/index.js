import React, { Component } from 'react';
import { View } from 'react-native';
import MapSearchBar from '../../mapSearchBar';
import DestinationSearchBar from '../destinationSearchBar';
import BackButton from '../backButton';
import CurrentLocation from '../currentLocation';
import Destination from '../destination';
import Car from './car';
import Bus from './bus';
import Walking from './walking';
import Bike from './bike';
import styles from './styles';

export default class OutdoorDirections extends Component {
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
      drawPath: true,
      mode: 'walking',
    };
  }

  /**
   * updates a draw path boolean. Draws a path when true
   */
  drawPath = () => {
    this.setState((prevState) => {
      return { drawPath: !prevState.drawPath };
    });
  };

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
    this.props.getCoordinates(newCoordinates);
  };

    /**
 * updates mode of transportation
 * @param {string} mode - Mode of transport: driving, bicycling, transit or walking
 */
    updateMode = (mode) => {
      this.setState({
        mode,
      });
    }

    render() {
      return (
        <View style={styles.searchContainer}>
          <MapSearchBar
            updateRegion={this.updateRegion}
            urCurentLocation={this.state.value}
            hideMenu={this.state.hide}
            drawPath={this.drawPath}
            currentBuildingPred={this.props.currentBuildingPred}
          />
          <DestinationSearchBar
            drawPath={this.state.drawPath}
            getRegionFromSearch={this.props.getRegionFromSearch}
            getDestinationIfSet={this.props.getDestinationIfSet}
            updatedRegion={this.state.region}
            coordinateCallback={this.updateCoordinates}
            getMode={this.state.mode}
          />
          <Car updateMode={this.updateMode} />
          <Bus
            navigation={this.props.navigation}
            updateMode={this.updateMode}
          />
          <Bike
            updateMode={this.updateMode}
          />
          <Walking
            updateMode={this.updateMode}
          />
          <View style={styles.container}>
            {this.props.showBack && (
            <BackButton
              changeVisibilityTo={this.props.changeVisibilityTo}
              coordinateCallback={this.updateCoordinates}
            />
            )}
            <CurrentLocation />
            <Destination />
          </View>
        </View>
      );
    }
}
