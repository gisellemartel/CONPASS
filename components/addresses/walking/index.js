import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import walk from '../../../assets/icons/walk.png';


export default class Walking extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.updateMode('walking'); }}>
          <Image style={styles.currentLocation} source={walk} />
        </TouchableOpacity>
      </View>
    );
  }
}
