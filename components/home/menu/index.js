import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import i18n from 'i18n-js';
import styles from './styles';
import conpass from './conpass.png';

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={conpass} />
        <View style={styles.options}>
          <Text style={styles.option}>
            {i18n.t('calendar')}
          </Text>
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
