import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import i18n from 'i18n-js';
import styles from './styles';
import conpass from '../../../assets/icons/conpass.png';

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={conpass} />
        <View style={styles.options}>
        <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate('Calendar');
            }}
          >
            <Text style={styles.option}>
              {i18n.t('calendar')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate('ShuttleSchedule');
            }}
          >
            <Text style={styles.option}>
              {i18n.t('shuttleBusSchedule')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.option}>
            {i18n.t('accessibility')}
          </Text>
        </View>
        <Text style={styles.help}>
          {i18n.t('help')}
        </Text>
      </View>
    );
  }
}

export default Menu;
