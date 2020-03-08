import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toHumanSize } from 'i18n-js';
import styles from './styles';
import bus from './bus.png';


export default class Bus extends Component {

  render() {
    return (
         <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.currentLocation} source={bus} />
        </TouchableOpacity>
      </View>
    );
  }
}