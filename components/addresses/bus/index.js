import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import bus from './bus.png';


export default class Bus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          // return this.props.navigation.navigate('');
        }}
        >
          <Image style={styles.currentLocation} source={bus} />
        </TouchableOpacity>
      </View>
    );
  }
}
