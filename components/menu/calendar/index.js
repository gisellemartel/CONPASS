import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import firebase from 'firebase';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import DashboardScreen from './Screens/DashboardScreen';
import FetchScreen from './Screens/FetchScreen';
import HomeScreen from '../../home';
import firebaseConfig from '../../../firebase.config';


export default class Calendar extends Component {
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
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
