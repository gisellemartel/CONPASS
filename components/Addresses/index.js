import React, { Component } from 'react';
import { View,Text } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';
import BackButton from '../BackButton';
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
        <View style={{top:13}} ><BackButton/></View>

        <View styles={{width:5,top:10}}><CurrentLocation/></View>

        <View styles={{width:5,top:10}}><Destination/></View>

        <View styles={{width:5,top:10}}><Car/></View>

        <View styles={{width:5,top:10}}><Bus/></View>

        <View styles={{width:5,top:10}}><Bike/></View>

        <View styles={{width:5,top:10}}><Walking/></View>                   
      </View>
    

    );
  }
}
