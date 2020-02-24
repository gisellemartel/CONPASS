import React, { Component } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import styles from './styles';

  

export default class TheMap extends Component{
     constructor(props){
    super(props);
    this.state={
      region: {
       latitude:  45.492409,
      longitude: -73.582153,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
      
    },
    };
  }
    componentDidMount() {
    const { description} = this.props.updatedRegion;
    console.log("in the map: "+description);
    this.setState({ region:description });
  }
  


    // onRegionChange(newregion){
    //     console.log("i reach this point");
    // this.setState({ region:newregion });
    // }
   
    render(){

    return (    
        <View style={styles.container}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                showUserLocation={true}
                region={this.props.updatedRegion} 
                style={styles.mapStyle} />
        </View>
    );
}
}
 const b=new TheMap();
