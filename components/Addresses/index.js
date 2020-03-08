import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';
import BackButton from './backButton';
import styles from './styles';
import CurrentLocation from './currentLocation';
import Destination from './destination';
import Car from './car';
import Bus from './bus';
import Walking from './walking';
import Bike from './bike';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar updateRegion={this.updateRegion} hideMenu={this.state.hide} />
          <SearchBarDestination />
        </View>
        <BackButton visiblityState={this.props.visiblityState} />
        <CurrentLocation />
        <Destination />
        <Car />
        <Bus />
        <Bike />
        <Walking />
      </View>

    );
  }
}
