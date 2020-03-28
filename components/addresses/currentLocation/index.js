import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import currentLocation from '../../../assets/icons/currentLocation.png';


export default class CurrentLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.currentLocation} source={currentLocation} />
      </View>
    );
  }
}
