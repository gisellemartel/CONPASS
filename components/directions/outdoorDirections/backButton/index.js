import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';


export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.props.changeVisibilityTo(false);
        }}
        >
          <Entypo name="chevron-left" size={32} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}
