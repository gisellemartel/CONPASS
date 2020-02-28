import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import Menu from './components/home/menu';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Menu" options={{ gestureDirection: 'horizontal-inverted', headerShown: false }} component={Menu} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
