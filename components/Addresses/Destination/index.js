import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toHumanSize } from 'i18n-js';
import styles from './styles';
import destination from './destination.png';


export default class Destination extends Component {

  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.currentLocation} source={destination} />
      </View>
    );
  }
}