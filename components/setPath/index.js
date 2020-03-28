/* eslint-disable max-len */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import directions from '../../assets/icons/directions.png';


export default class SetPath extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.changeVisibilityTo(true); }}>
          <Image style={styles.directions} source={directions} />
        </TouchableOpacity>
      </View>
    );
  }
}
