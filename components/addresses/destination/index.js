import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import destination from '../../../assets/icons/destination.png';


export default class Destination extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.currentLocation} source={destination} />
      </View>
    );
  }
}
