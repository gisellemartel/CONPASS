import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';


export default class CloseModalButton extends Component {
  hideBuildingInfoModal() {
    this.props.hideBuildingInfoModal();
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          return this.props.hideBuildingInfoModal();
        }}
        >
          <Feather name="x-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}
