import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';
import { connect, Provider } from 'react-redux';
import styles from './styles';
import conpass from './conpass.png';
import Language from './Language';
import store from '../../../store';

const Stack = createStackNavigator();

class Menu extends Component {
  render() {
    return (

      <Stack.Navigator
        initialRouteName="MenuOptions"
        screenOptions={{
          title: '',
          headerStyle: {
            backgroundColor: '#F5FCFF',
            shadowColor: 'transparent',
          },
          headerTintColor: '#808080',
          headerBackTitleStyle: {
            fontSize: 25
          }
        }}
      >
        <Stack.Screen name="MenuOptions" options={{ headerShown: false }} component={MenuOptions} />
        <Stack.Screen name="Language" component={Language} />
      </Stack.Navigator>

    );
  }
}

class MenuOptions extends Component {
  render() {
    const { language } = this.props;
    return (
      <View style={styles.container}>
        {language}
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

const mapStateToProps = (state) => {
  return { language: state.language };
};

export default connect(mapStateToProps)(Menu);
