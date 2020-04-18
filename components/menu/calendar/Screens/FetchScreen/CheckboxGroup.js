/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View, FlatList, AsyncStorage, Text, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';


export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarsToSync: [],
    };
  }

setCalendarsToSyncList = (storageId) => {
  // console.log('event pressed ',storageId);
  const elementIndex = (this.state.calendarsToSync).indexOf(storageId);

  // if the element exists, then it will be removed from calendarToSync array
  if (elementIndex > -1) {
    (this.state.calendarsToSync).splice(elementIndex, 1);
  } else { (this.state.calendarsToSync).push(storageId); }
  // if the element doesn't exits, then it will be added from calendarToSync array
}

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

handleSyncronizeButton=async () => {
  Alert.alert('The following calendars will be synchronized',
    `${this.getCalendarsToBeSynced()}`,
    [
      {
        text: 'Cancel',
        onPress: () => { return console.log('Cancel Pressed'); },
        style: 'cancel'
      },
      { text: 'OK', onPress: () => { return this.navigateToDashboardScreen(); } }
    ],
    { cancelable: false });
}

navigateToDashboardScreen = async () => {
  const events = await this.getFinalEventsArray();
  this.saveFinalEventsArray(events);
  this.props.navigationHandlerCallback(events);
}

saveFinalEventsArray= async (finalCalendar) => {
  const stringFile = JSON.stringify(finalCalendar);
  AsyncStorage.setItem('events', stringFile);
}

getFinalEventsArray= async () => {
  if (this.state.calendarsToSync.length !== 0) {
    let startIndex = 0;
    do {
      const evnts = await AsyncStorage.getItem(this.state.calendarsToSync[startIndex]);
      // eslint-disable-next-line vars-on-top
      var finalCalendarToBeSynced = JSON.parse(evnts);
      startIndex++;
    } while (('error' in finalCalendarToBeSynced) && startIndex < this.state.calendarsToSync.length);
    // console.log('test: ',finalCalendarToBeSynced);
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
    // console.log(finalCalendarToBeSynced);
  } else {
    finalCalendarToBeSynced = { items: [] };
  }

  return finalCalendarToBeSynced;
}

// changeColor(id){
//   var currentColor = 'blue';
//   this.setState({buttonColor: this.state.itemSelected === id? currentColor,});
// }

render() {
  const itemsSelected = [];
  console.log(itemsSelected.length);
  return (
    <View>
      <Text style={styles.title}>Availabe Calendars For Synchronization</Text>
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
          title="Synchronize Calendars"
          type="solid"

          onPress={this.handleSyncronizeButton}
        />
      </View>

    </View>
  );
}
}
