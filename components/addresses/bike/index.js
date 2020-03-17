import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import bike from './bike.png';


export default class Bike extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.currentLocation} source={bike} />
        </TouchableOpacity>
      </View>
    );
  }
}
