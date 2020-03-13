import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

class Building extends Component {

  end() {
    console.log('okkkk');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title={'quit'} onPress={() => { this.end()}} />
      </View>
    );
  }
}

export default Building;
