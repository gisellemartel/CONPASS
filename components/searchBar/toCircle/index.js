import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import directions from './directions.png';


export default class toCircle extends Component {
    onPress = () => {
      console.log('ay');
    }

    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => { return console.log('hello'); }}>
            <Image style={styles.directions} source={directions} />
          </TouchableOpacity>
        </View>
      );
    }
}
