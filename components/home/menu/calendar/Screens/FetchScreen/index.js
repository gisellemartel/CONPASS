import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class FetchScreen extends Component {
  componentDidMount() {
    this.checkToken();
    this.getData();
  }

  checkToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userInfoResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonFile = await userInfoResponse.json();
    const items = jsonFile;
    if (!items) {
      firebase.auth().signOut();
      this.props.navigation.navigate('LoadingScreen');
    }
  }

  getData = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);
    this.props.navigation.navigate('DashboardScreen', { events });
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
