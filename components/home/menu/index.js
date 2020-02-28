import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import conpass from './conpass.png';

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={conpass} />
        <Text>
          Set Calendar
        </Text>
        <Text>
          Accessibility
        </Text>
        <Text>
          Language
        </Text>
        <Text>
          Help
        </Text>
      </View>
    );
  }
}
