import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

export default class SwitchCampuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
    };
  }


  async functionSetLoyola() {
    const state = await this.setState({
      region: {
        latitude: 45.458025,
        longitude: -73.640192,
      }
    });
    this.props.callBack(this.state.region);
  }

  async functionSetSGW() {
    const state = await this.setState({
      region: {
        latitude: 45.495598,
        longitude: -73.577850,
      }
    });
    this.props.callBack(this.state.region);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <Button
            title="Loyola"
            onPress={() => { return this.functionSetLoyola(); }}
          />

        </View>

        <View style={styles.btn}>
          <Button
            title="SGW"
            onPress={() => { return this.functionSetSGW(); }}
          />
        </View>
      </View>
    );
  }
}
