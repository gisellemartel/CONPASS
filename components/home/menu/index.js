import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import styles from './styles';
import conpass from './conpass.png';

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={conpass} />
        <View style={styles.options}>
          <Text style={styles.option}>
            {i18n.t('setCalendar')}
          </Text>
          <Text style={styles.option}>
            {i18n.t('accessibility')}
          </Text>
          <Text style={styles.option} onPress={() => { return this.props.navigation.navigate('Language'); }}>
            {i18n.t('language')}
          </Text>
        </View>
        <Text style={styles.help}>
          {i18n.t('help')}
        </Text>
      </View>
    );
  }
}

/**
 * Redux store listener. This function will update
 * the connected component state whenever the store updates.
 */
const mapStateToProps = (state) => {
  return { language: state.language };
};

export default connect(mapStateToProps)(Menu);
