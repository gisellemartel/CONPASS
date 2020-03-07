import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        position: 'absolute', top: 0, backgroundColor: 'white', width: '100%', height: 180
      }}
      >
        <View style={{ alignItems: 'center' }}>
          <SearchBar updateRegion={this.updateRegion} />
          <SearchBarDestination />
        </View>
      </View>


    );
  }
}
