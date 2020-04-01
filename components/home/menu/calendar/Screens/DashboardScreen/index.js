/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import firebase from 'firebase';
import {
  View, Text, Button, TouchableOpacity, Alert, Platform
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import styles from './styles';

export default class DashboardScreen extends Component {
  _isMounted = false

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      notifyEvents: this.notify(props.navigation.state.params.events),
      pushNotficationToken: '',
      synchronizedEvents:
        this.structureSynchronizedEvents(props.navigation.state.params.events.items)
    };
  }

  async componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._isMounted = true;

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reminders', {
        name: 'Reminders',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


    registerForPushNotificationsAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // only asks if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      // On Android, permissions are granted on app installation, so
      // `askAsync` will never prompt the user

      // Stop here if the user did not grant permissions
      if (status !== 'granted') {
        alert('No notification permissions!');
        return;
      }

      // Get the token that identifies this device
      const token = await Notifications.getExpoPushTokenAsync();
      this.setState({ pushNotficationToken: token });
      console.log(this.state.pushNotficationToken);
      try {
        firebase.database().ref(`users/${this.currentUser.uid}/push_token`).set(token);
      } catch (error) {
        console.log(error);
      }
    }

  loadItems = (day) => {
    setTimeout(() => {
      const uppderBoundForSync = 85;
      const lowerBoundForSync = -15;
      for (let i = lowerBoundForSync; i < uppderBoundForSync; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const todayEvents = this.state.synchronizedEvents
            .filter((event) => { return strTime === event.date; });
          const numItems = todayEvents.length;
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: todayEvents[j].title,
              startTime: todayEvents[j].startTime,
              endTime: todayEvents[j].endTime,
              description: todayEvents[j].description,
              address: todayEvents[j].address,
              height: 80
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => { newItems[key] = this.state.items[key]; });
      if (this._isMounted) {
        this.setState({
          items: newItems
        });
      }
    }, 1000);
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
    };

    sendPushNotification = () => {
      // const response = fetch('https://exp.host/--/api/v2/push/send', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Countent-Type': 'application/json',
      //   },
      //   body: JSON.stringify({

      //   })
      // });
      const localNotification = {
        to: this.state.pushNotficationToken,
        sound: 'default',
        priority: 'high',
        title: 'Log out',
        body: 'You are logged out',
        channelId: 'reminders'
      };
      const t = (new Date()).getTime() + 20000;
      console.log(t);
      const schedulingOptions = {
        time: t
      };

      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }

    structureSynchronizedEvents(events) {
      const tempArray = [];
      events.forEach((event) => {
        tempArray.push(
          {
            date: event.start.dateTime != null ? event.start.dateTime.substring(0, event.start.dateTime.indexOf('T')) : event.start.date,
            title: event.summary != null ? event.summary : 'No Title For this Event',
            startTime: event.start.dateTime != null ? event.start.dateTime : event.start.date,
            endTime: event.end.dateTime != null ? event.end.dateTime : event.end.date,
            description: event.description != null ? event.description : '',
            address: ''
          }
        );
      });
      if (this._isMounted) {
        this.setState({
          synchronizedEvents: this.tempArray
        });
      }
      return tempArray;
    }

    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }

    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }

    renderItem(item) {
      return (
        <TouchableOpacity
          style={[styles.item, { height: item.height }]}
          onPress={() => { return Alert.alert(item.name, `${item.startTime}  -  ${item.endTime}\n${item.description}\n${item.address}`); }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}>
          <Text>This is empty date!</Text>
        </View>
      );
    }


    render() {
      return (
        <View
          style={{ height: 750 }}
        >
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            selected="2020-03-27"
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
            rowHasChanged={this.rowHasChanged}
          />
          <Button
            title="Logout"
            onPress={() => {
              firebase.auth().signOut();
              this.sendPushNotification();
            }}
          />
        </View>
      );
    }
}
