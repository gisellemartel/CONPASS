import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import car from '../../../../assets/icons/car.png';


export default class Car extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.updateMode('driving'); }}>
          <Image style={styles.currentLocation} source={car} />
        </TouchableOpacity>
      </View>
    );
  }
}
