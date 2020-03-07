import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import directions from './directions.png';


export default class toCircle extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const { navigate } = this.props;
    console.log(navigate);
    return (
      <Icon navigation={this.props.navigation} />
    );
  }
}

const Icon = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { return props.navigation.navigate('Addresses'); }}>
        <Image style={styles.directions} source={directions} />
      </TouchableOpacity>
    </View>
  );
};
