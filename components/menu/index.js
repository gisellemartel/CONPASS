import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import styles from './styles';
import conpass from '../../assets/icons/conpass.png';
import { accessibilityOn, accessibilityOff } from '../../store/actions';
import { ACCESSIBILITY_ON, ACCESSIBILITY_OFF } from '../../store/actionTypes';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessibility: this.props.accessibility
    };
  }

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
              if (this.state.accessibility === 'ACCESSIBILITY_ON') {
                return this.props.accessibilityOff();
              }
              return this.props.accessibilityOn();
            }}
          >
            <Text style={styles.option}>
              {this.state.accessibility === ACCESSIBILITY_ON ? i18n.t('accessibility_off') : i18n.t('accessibility_on')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.help}>
          {i18n.t('help')}
        </Text>
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accessibility === this.props.accessibility) {
      if (this.props.accessibility === ACCESSIBILITY_ON) {
        // set component state
        this.setState({ accessibility: 'ON' });
      } else if (this.props.accessibility === ACCESSIBILITY_OFF) {
        // set component state
        this.setState({ accessibility: 'OFF' });
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    accessibility: state.accessibility,
  };
};

const mapDispatch = (dispatch) => {
  return {
    accessibilityOn: () => { dispatch(accessibilityOn()); },
    accessibilityOff: () => { dispatch(accessibilityOff()); }
  };
};

export default connect(mapStateToProps, mapDispatch)(Menu);
