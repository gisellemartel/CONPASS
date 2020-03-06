import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styles';

export default class toCircle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.touch}>
          <TouchableHighlight>
            <Text>To</Text>
          </TouchableHighlight>
        </View>
      </View>

    );
  }
}
