import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './styles';

export default class DashboardScreen extends Component {
  render() {
    return (

      <Agenda
// The list of items that have to be displayed in agenda. If you want to render item as empty date
// the value of date key has to be an empty array []. If there exists no value for date key it is
 // considered that the date in question is not yet loaded
        items={{
          '2012-05-22': [{ name: 'item 1 - any js object' }],
          '2012-05-23': [{ name: 'item 2 - any js object', height: 80 }],
          '2012-05-24': [],
          '2012-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
        }}
// Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}

// Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}

// Callback that gets called on day press
        onDayPress={(day)=>{ console.log('day pressed') }}

// Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day)=>{ console.log('day changed') }}

// Initially selected day
        selected={'2012-05-16'}

  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}

  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2012-05-30'}

  // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}

  // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}

  // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => { return (<View><Text>Hello3</Text></View>); }}

  // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => { return (<View><Text>Hello2</Text></View>); }}

  // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => { return (<View><Text>Hello1</Text></View>); }}

  // Specify how agenda knob should look like
  // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => { return (<View><Text>Hello</Text></View>); }}

  // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text; }}

// By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2012-05-16': { selected: true, marked: true },
          '2012-05-17': { marked: true },
          '2012-05-18': { disabled: true }
        }}
      />
    );
  }
}
