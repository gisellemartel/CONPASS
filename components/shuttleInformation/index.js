import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

export default class Shuttle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <Button
            title="Shuttle Bus Information"
            onPress={() => { console.log('fff'); }}
          />

        </View>
      </View>
    );
  }
}
