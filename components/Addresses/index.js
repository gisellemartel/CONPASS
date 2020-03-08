import React, { Component } from 'react';
import { View,Text } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';
import BackButton from '../BackButton';
import styles from './styles';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ alignItems: 'center', width:'500%' }}>
          <SearchBar updateRegion={this.updateRegion} />   
        </View>
        
        <View style={{ alignItems: 'center', width:'500%' }}>
          <SearchBarDestination />     
        </View>

        <View style={{top:13}} >
          <BackButton/>
        </View>

      </View>
      
    );
  }
}
