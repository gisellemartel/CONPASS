import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getCurrentLocation from './LocationServices';
import styles from './styles';
import locateMe from './locate-me.png';

export default class Location extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            getCurrentLocation(this);
          }}
        >
          <Image style={styles.location} source={locateMe} />
        </TouchableOpacity>
      </View>
    );
  }
}
