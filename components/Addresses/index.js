import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';
import BackButton from './BackButton';
import styles from './styles';
import CurrentLocation from './CurrentLocation';
import Destination from './Destination';
import Car from './Car';
import Bus from './Bus';
import Walking from './Walking';
import Bike from './Bike';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      hide: true,
    };
  }
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
  

    updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
    this.props.getCoordinates(newCoordinates);
  };

  getPolylinePoint = (data) => {
    this.setState({
      encryptedLine: data
    });
  };




  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar updateRegion={this.updateRegion} hideMenu={this.state.hide} />
          <SearchBarDestination 
            updatedRegion={this.state.region} 
            callBack2={this.updateRegion2} 
            coordinateCallback={this.updateCoordinates} 
            getPolylinePoint={this.getPolylinePoint} 
          />
        </View>
        <BackButton visiblityState={this.props.visiblityState} />
        <CurrentLocation />
        <Destination />
        <View style={{zIndex: 0}}>
        <Car />
        <Bus />
        <Bike />
        <Walking />
        </View>
      </View>

    );
  }
}
