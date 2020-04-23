import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
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
            <Text style={styles.option}>{i18n.t('calendar')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate('Help');
            }}
          >
            <Text style={styles.option}>{i18n.t('help')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessibility: state.accessibility,
  };
};

const mapDispatch = (dispatch) => {
  return {
    accessibilityOn: () => {
      dispatch(accessibilityOn());
    },
    accessibilityOff: () => {
      dispatch(accessibilityOff());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Menu);
