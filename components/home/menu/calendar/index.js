import React, { Component } from 'react';
// import apiCalendar from 'react-google-calendar-api';
import {
  View, Text, Button, TouchableOpacity
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import firebase from '../../../../firebase.config';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import DashboardScreen from './Screens/DashboardScreen';
import FetchScreen from './Screens/FetchScreen';


export default class Calendar extends Component {
  constructor(props){
    super(props);
  }

// g'2020-03-24T00:00:00+00:00'
  componentDidMount() {
    this.getEvents();
  }

// timeMin=2020-03-24T00:00:00.000Z
  getEvents() {
    return fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        accessToken: 'Bearer ya29.a0Adw1xeXMZJ4PpWtLMI75lZtcfV80_VhRczd5b6aP5QC-XmkxGqEqm-JHJ0hk_IHoHjFIae1qrMBYrr15a6idiEc1NbcyABiAQdx0Bn2XnxbFYUA62qDRqIoZapZd0xHSKCRXC8H8vQZvc7npVQdk2Wh2yz8nRw4Coqw'
      }
    })
      .then((response) => { response.json(); })
      .then((responseJson) => {
        console.log('--->'+ responseJson.items[3]);
      })

      .catch((error) => {
        console.log('-!!!!!!!!!!!!!!!!!!!!');
        console.log(error);
      });
  }

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
  FetchScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
