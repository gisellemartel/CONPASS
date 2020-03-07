import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import i18n from 'i18n-js';
import Home from './components/home';
import Menu from './components/home/menu';
import Language from './components/home/menu/Language';
import Addresses from './components/addresses';
import store from './store';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              title: '',
              headerStyle: {
                backgroundColor: '#F5FCFF',
                shadowColor: 'transparent',
              },
              headerTintColor: '#808080',
              headerBackTitleStyle: {
                fontSize: 25
              },
              headerBackTitle: i18n.t('back')
            }}
          >
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="Menu" options={{ gestureDirection: 'horizontal-inverted', headerShown: false }} component={Menu} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Addresses" options={{ headerShown: false }} component={Addresses} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
