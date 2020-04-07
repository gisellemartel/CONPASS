import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// eslint-disable-next-line no-unused-vars
import firebase from '../../../firebase.config';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import DashboardScreen from './Screens/DashboardScreen';
import FetchScreen from './Screens/FetchScreen';
import HomeScreen from '../../home';


export default class Calendar extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginScreen,
  DashboardScreen,
  FetchScreen,
  HomeScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
