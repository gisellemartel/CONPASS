import React, { Component } from 'react';
import { View, Text } from 'react-native';
import i18n from 'i18n-js';
import { Dropdown } from 'react-native-material-dropdown';
import RNRestart from 'react-native-locale-listener';
import styles from './styles';


export default class Language extends Component {
  constructor(props) {
    super(props);
  }

  setLanguage(value, item, data) {
    i18n.locale = 'en';
  }

  render() {
    
    const dataSet = [{
      value: 'English',
    }, {
      value: 'French',
    }, {
      value: 'Spanish',
    }];
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Choose the preffered language for navigation menu, names etc.
        </Text>
        <View style={styles.dropdown}>
          <Dropdown
            label="Language"
            data={dataSet}
            itemCount={6}
            onChangeText={this.setLanguage}
          />
        </View>
      </View>
    );
  }
}
