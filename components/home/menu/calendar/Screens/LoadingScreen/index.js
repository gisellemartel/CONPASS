import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LoadingScreen</Text>
      </View>
    );
  }
}
