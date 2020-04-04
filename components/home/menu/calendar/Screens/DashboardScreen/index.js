import {
  YellowBox,
  View, Text, TouchableOpacity, Alert, Platform
} from 'react-native';
import _ from 'lodash';
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
import firebase from 'firebase';

import { Agenda } from 'react-native-calendars';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import styles from './styles';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class DashboardScreen extends Component {
  _isMounted = false

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isDialogVisible: false,
      notifyEvents: this.notify(props.navigation.state.params.events),
      pushNotficationToken: '',
      timeToNotify: 1,
      synchronizedEvents:
        this.structureSynchronizedEvents(props.navigation.state.params.events.items)
    };
  }

  async componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser }, this.registerForPushNotificationsAsync);
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

  /**
   * Registers device to receive push notifications
   */
  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    if (this._isMounted) {
      this.setState({ pushNotficationToken: token });
    }
    try {
      console.log(this.state.currentUser.uid);
      firebase.database().ref(`users/${this.state.currentUser.uid}/push_token`).set(token);
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

  /**
   *
   * @param {object} events - All the user events
   * Formats the events to only return required events
   */
  notify = (events) => {
    const notifyArray = [];
    events.items.forEach((element) => {
      const date = new Date(element.start.dateTime);
      if (element.summary.includes('conpass') && date.getTime() > (new Date()).getTime()) {
        notifyArray.push({
          startDate: element.start.dateTime,
          summary: element.summary,
        });
      }
    });
    return notifyArray;
  };

    /**
     * Schedules push notifications to user upon adjusting the timer
     */
    sendPushNotification = () => {
      console.log(this.state.timeToNotify);
      // Enable this to get immeaiate notifications
      Notifications.dismissAllNotificationsAsync();
      const localNotification = {
        to: this.state.pushNotficationToken,
        sound: 'default',
        priority: 'high',
        title: 'Conpass Notification',
        body: 'Ayyyyyyyyyyyyyyyyyyyyyyyyyyy we testing',
        channelId: 'reminders'
      };
      Notifications.presentLocalNotificationAsync(localNotification);

      this.state.notifyEvents.forEach((element) => {
        const localNotification = {
          to: this.state.pushNotficationToken,
          sound: 'default',
          priority: 'high',
          title: 'Conpass Notification',
          body: element.summary,
          channelId: 'reminders'
        };
        const date = new Date(element.startDate);

        const t = date.getTime() - this.state.timeToNotify * 60 * 1000;
        const schedulingOptions = {
          time: t
        };
        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
      });
    }

    /**
   * @param {boolean} boolean - True or false
   * Shows or hides the dialong box of 'Adjust time' button
   */
    showDialog=(boolean) => {
      if (this._isMounted) {
        this.setState({ isDialogVisible: boolean });
      }
    }

    /**
   * @param {integer} number - Time in minutes
   * Sets the minutes in which the user wants to get notfications before
   */
    sendInput=(number) => {
      if (this._isMounted) {
        this.setState({ timeToNotify: number });
        this.setState({ isDialogVisible: false });
      }
      setTimeout(() => {
        this.sendPushNotification();
      }, 100);
    }

    /**
   * @param {integer} number - Time in minutes
   * Sets the minutes in which the user wants to get notfications before
   */
    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }

    /**
   * @param {object} events - All the events the user has
   * Structures all the events the user has
   */
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
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title="Set Reminder Time"
            message="Set the time to be reminded before class/minutes"
            hintInput="e.g. 10"
            submitInput={(inputText) => { this.sendInput(inputText); }}
            closeDialog={() => { this.showDialog(false); }}
          />
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            selected="2020-03-27"
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
            rowHasChanged={this.rowHasChanged}
          />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  firebase.auth().signOut();
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  this.showDialog(true);
                }}
              >
                <Text>Adjust Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}
