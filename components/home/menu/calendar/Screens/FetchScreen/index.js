import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';


export default class FetchScreen extends Component {
  componentDidMount() {
    this.getData();
  }


  getData = () => {
    const evnts = AsyncStorage.getItem('events');
    const notifyElements = this.notify(events);
    console.log(notifyElements);
    const events = JSON.parse(evnts);
    this.props.navigation.navigate('DashboardScreen', { events });
  }

  notify = (events) => {
    const notifyArray = [];
    events.items.forEach((element) => {
      notifyArray.push({
        startDate: element.start.dateTime,
        summary: element.summary,
        reminders: element.reminders,
      });
    });
    return notifyArray;
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
