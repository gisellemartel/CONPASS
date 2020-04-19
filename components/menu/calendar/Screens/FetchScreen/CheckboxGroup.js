/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View, FlatList, AsyncStorage, Text, TouchableOpacity, Alert
} from 'react-native';
import i18n from 'i18n-js';
import { Button } from 'react-native-elements';
import styles from './styles';


export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarsToSync: [],
    };
  }

/**
 * This function updates the calendarsToSync array state.
 * @param {String} storageId - Unique Id's of calendars.
 */
setCalendarsToSyncList = (storageId) => {
  const elementIndex = (this.state.calendarsToSync).indexOf(storageId);

  // if the element exists, then it will be removed from calendarToSync array
  if (elementIndex > -1) {
    (this.state.calendarsToSync).splice(elementIndex, 1);
  } else { (this.state.calendarsToSync).push(storageId); }
  // if the element doesn't exits, then it will be added from calendarToSync array
}

/**
 * Thie function returns an array of summaries of calendars to be synced.
 */
getCalendarsToBeSynced= () => {
  const calendarsSummaryToBeSynced = [];
  const calendarsTemp = this.props.options.filter((item) => {
    return this.state.calendarsToSync.includes(item.storageId);
  });
  calendarsTemp.forEach((element) => {
    calendarsSummaryToBeSynced.push(element.summary);
  });
  return calendarsSummaryToBeSynced;
}

/**
 * Thie function handles syncronization button
 */
handleSyncronizeButton=async () => {
  if (this.state.calendarsToSync.length === 0) { Alert.alert(i18n.t('noListAlert')); return; }
  Alert.alert(i18n.t('calendarListAlert'),
    `${this.getCalendarsToBeSynced()}`,
    [
      {
        text: i18n.t('cancel'),
        onPress: () => { return console.log('Cancel Pressed'); },
        style: 'cancel'
      },
      { text: 'OK', onPress: () => { return this.navigateToDashboardScreen(); } }
    ],
    { cancelable: false });
}

/**
 * This function handles the navigation to DashboardScreen
 */
navigateToDashboardScreen = async () => {
  const events = await this.getFinalEventsArray();
  this.saveFinalEventsArray(events);
  this.props.navigationHandlerCallback(events);
}

/**
 * This function saves the final calendar to be synced
 * @param {Array} finalCalendar - Final calendar object.
 */
saveFinalEventsArray= async (finalCalendar) => {
  const stringFile = JSON.stringify(finalCalendar);
  AsyncStorage.setItem('events', stringFile);
}

/**
 * This function creates and returns the final calendar object.
 * This calendar object contains all the events in items array.
 */
getFinalEventsArray= async () => {
  let finalCalendarToBeSynced = null;
  if (this.state.calendarsToSync.length !== 0) {
    let startIndex = 0;
    let evnts;
    do {
      evnts = await AsyncStorage.getItem(this.state.calendarsToSync[startIndex]);
      finalCalendarToBeSynced = JSON.parse(evnts);
      startIndex++;
    } while (('error' in finalCalendarToBeSynced) && startIndex < this.state.calendarsToSync.length);
    let i;
    for (i = 1; i < this.state.calendarsToSync.length; i++) {
      const tempEvnts = await AsyncStorage.getItem(this.state.calendarsToSync[i]);
      const tempCalendarToBeMerged = JSON.parse(tempEvnts);

      if ('items' in tempCalendarToBeMerged) {
        finalCalendarToBeSynced.items = (finalCalendarToBeSynced.items)
          .concat(tempCalendarToBeMerged.items);
      }
    }

    if ('error' in finalCalendarToBeSynced) {
      finalCalendarToBeSynced = { items: [] };
    }
  } else {
    finalCalendarToBeSynced = { items: [] };
  }

  return finalCalendarToBeSynced;
}

render() {
  return (
    <View>
      <Text style={styles.title}>{i18n.t('calendarList')}</Text>
      <FlatList
        style={styles.flatListContainer}
        keyExtractor={(item) => { return item.id; }}
        data={this.props.options}
        extraData={this.state}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              this.setCalendarsToSyncList(item.storageId);
              this.forceUpdate();
            }}
            >
              <Text
                id={item.id}
                style={{
                  marginTop: 24,
                  padding: 30,
                  backgroundColor: this.state.calendarsToSync.includes(item.storageId) ? '#EEB462' : 'rgba(156,211,215,0.95)',
                  fontSize: 24,
                  overflow: 'hidden',
                  borderRadius: 10
                }}
              >
                {item.summary}
              </Text>
            </TouchableOpacity>

          );
        }}
      />

      <View style={styles.button}>
        <Button
          title={i18n.t('synchronizeCalendars')}
          type="solid"

          onPress={this.handleSyncronizeButton}
        />
      </View>

    </View>
  );
}
}
