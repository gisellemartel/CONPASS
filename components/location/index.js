
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getCurrentLocation from './getCurrentLocation';
import styles from './styles';
import locateMe from '../../assets/icons/locate-me.png';

export default class Location extends Component {
  /** @async
   * Will update the view to position the map at the user's current location
   *and Returns the name of building the user is currently located in (if the user is on campus) */
  async locateMe() {
    await getCurrentLocation(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.locateMe();
          }}
        >
          <Image style={styles.location} source={locateMe} />
        </TouchableOpacity>
      </View>
    );
  }
}
