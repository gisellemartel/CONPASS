import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import i18n from 'i18n-js';
import Home from './components/home';
import Menu from './components/menu';
import ShuttleSchedule from './components/menu/shuttleBusSchedule';
import Calendar from './components/menu/calendar';
import store from './store';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
              <Stack.Screen name="ShuttleSchedule" options={{ gestureDirection: 'vertical-inverted', headerShown: true }} component={ShuttleSchedule}></Stack.Screen>
              <Stack.Screen name="Calendar" options={{ gestureDirection: 'vertical-inverted', headerShown: true }} component={Calendar}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    );
  }
}
