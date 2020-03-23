/* eslint-disable max-len */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';


export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.props.changeSuggestionVisibility(false);
        }}
        >
          <Feather name="x-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}
