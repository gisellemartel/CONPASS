import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles.js';

export default class Home extends Component {
  
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Hello World</Text>
      </View>
    );
  }
}
