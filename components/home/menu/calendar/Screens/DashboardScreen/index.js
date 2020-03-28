import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      synchronizedEvents: this.structureSynchronizedEvents(
        props.navigation.state.params.jsonFile.items
      )
    };

    console.log("in dashboard:\n ");
    console.log('Structure the thing:\n',this.state.synchronizedEvents);
  }

  structureSynchronizedEvents(events){
    let tempArray = [];
    events.forEach(event => {
      tempArray.push(
        {
          date: event.start.dateTime != null ? event.start.dateTime.substring(0,event.start.dateTime.indexOf('T')):event.start.date,
          title: event.summary!=null ? event.summary:'No Title For this Event',
          startTime: event.start.dateTime != null ? event.start.dateTime : event.start.date,
          endTime: event.end.dateTime != null ? event.end.dateTime : event.end.date,
          description: event.description != null ?event.description : '',
          address: ''
        }
      )
    });
    this.setState({
      synchronizedEvents:this.tempArray
    });
    console.log('temp:\n',tempArray,'--->\n\n\-n>>>>');
    return tempArray;
  }
  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2020-03-27'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
            setTimeout(() => {
              for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                //console.log('Timestamp ',day.timestamp,' Time ',time);
                const strTime = this.timeToString(time);
                //console.log(!this.state.items[strTime]);
                if (!this.state.items[strTime]) {
                  this.state.items[strTime] = [];

                  const todayEvents = this.state.synchronizedEvents.filter((event)=>{return strTime==event.date});
                  const numItems = todayEvents.length;//Math.floor(Math.random() * 5);
                  //console.log(numItems);
                  for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                      name: todayEvents[j].title,
                      startTime: todayEvents[j].startTime,
                      endTime: todayEvents[j].endTime,
                      description: todayEvents[j].description,
                      address: todayEvents[j].address,
                      height: 80//Math.max(50, Math.floor(Math.random() * 150))
                    });
                  }
                  //console.log('\n--> ',this.state.items[strTime]);
                }
              }
              const newItems = {};
              Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
              this.setState({
                items: newItems
              });
            }, 1000);
          }
        
          renderItem(item) {
            return (
              <TouchableOpacity 
                style={[styles.item, {height: item.height}]} 
                onPress={() => Alert.alert(item.name,`${item.startTime}  -  ${item.endTime}\n${item.description}\n${item.address}`)}
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
        
          rowHasChanged(r1, r2) {
            return r1.name !== r2.name;
          }
        
          timeToString(time) {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
          }
        }
       
        const styles = StyleSheet.create({
          item: {
            backgroundColor: 'white',
            flex: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17
          },
          emptyDate: {
            height: 15,
            flex:1,
            paddingTop: 30
          }
        });
        