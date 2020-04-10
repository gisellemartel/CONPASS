import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import styles from './styles';
import conpass from '../../assets/icons/conpass.png';
import { accessibilityOn, accessibilityOff } from '../../store/actions';

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
          />
          <Text style={styles.option}>
            {i18n.t('shuttleBusSchedule')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // return this.props.navigation.navigate('ShuttleSchedule');
            }}
          />
          <Text style={styles.option}>
            {i18n.t('accessibility')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              return this.props.accessibilityOn();
            }}
          >
            <Text style={styles.option}>
              ON
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return this.props.accessibilityOff();
            }}
          >
            <Text style={styles.option}>
              OFF
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.help}>
          {i18n.t('help')}
        </Text>
      </View>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    accessibilityOn: () => { dispatch(accessibilityOn()); },
    accessibilityOff: () => { dispatch(accessibilityOff()); }
  };
};

export default connect(null, mapDispatch)(Menu);
