import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
      hide: true
    };
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={{
          alignItems: 'center', width: '87%', left: 48,
        }}
        >
          <SearchBar updateRegion={this.updateRegion} hideMenu={this.state.hide} />
        </View>


        <View style={{
          alignItems: 'center', width: '87%', left: 48, top: 4
        }}
        >
          <SearchBarDestination />
        </View>
        <View style={{ top: 13 }}>
          <BackButton visiblityState={this.props.visiblityState} />
        </View>
        <View><CurrentLocation /></View>
        <View><Destination /></View>
        <View><Car /></View>
        <View><Bus /></View>
        <View><Bike /></View>
        <View><Walking /></View>
      </View>

    );
  }
}
