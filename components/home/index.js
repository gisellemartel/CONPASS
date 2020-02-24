import React, { Component } from 'react';
import {View, Text } from 'react-native';
import styles from './styles';
import TheMap from 'app/components/map';
import SearchBar from 'app/components/searchBar';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      region:{

        latitude: 45.492409,
      longitude: -73.582153,
      latitudeDelta: 0.04,
        longitudeDelta: 0.04
       },
    };
  }
  updateRegion=(newRegion)=>{
    console.log("region at home is: "+newRegion.latitude);
    this.setState({ region:{
                       latitude:newRegion.latitude,
                       longitude:newRegion.longitude,
                       latitudeDelta: 0.05,
                        longitudeDelta: 0.05
    
    }})
  }

  render() {
    return (
      
      <View style={styles.container}>
        <TheMap updatedRegion={this.state.region} />
       
        <SearchBar callBack={this.updateRegion} />
      </View>
    );
  }
}
// onSendLat = {this.handleLat} onSendLng={this.handleLng} 