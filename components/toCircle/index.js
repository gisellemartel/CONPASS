import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toHumanSize } from 'i18n-js';
import styles from './styles';
import directions from './directions.png';


export default class toCircle extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.visibilityState(true); }}>
          <Image style={styles.directions} source={directions} />
        </TouchableOpacity>
      </View>
    );
  }
}
