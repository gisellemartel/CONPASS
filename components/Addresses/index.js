import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBar from '../searchBar';
import SearchBarDestination from '../searchBarDestination';

export default class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
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
     };

     render() {
       return (
         <View style={{
           position: 'absolute', top: 0, backgroundColor: 'white', width: '100%', height: 180
         }}
         >
           <View style={{ alignItems: 'center' }}>
             <SearchBar updateRegion={this.updateRegion} navigation={this.props.navigation} />
             <SearchBarDestination />
           </View>
         </View>




       );
     }
}
