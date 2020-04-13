import React, { Component } from 'react';
import { View,FlatList, ScrollView, AsyncStorage, Text,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Checkbox,ListItem } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);

    this.state={
      calendarsToSync: [],
      itemColor: 'pink'
    }
}
setCalendarsToSyncList = (storageId)=>{
  //console.log('event pressed ',storageId);
  const elementIndex = (this.state.calendarsToSync).indexOf(storageId);
  
  if(elementIndex>-1)// if the element exists, then it will be removed from calendarToSync array
    (this.state.calendarsToSync).splice(elementIndex,1);
  else //if the element doesn't exits, then it will be added from calendarToSync array
    (this.state.calendarsToSync).push(storageId)

  //console.log('calendarsToSync: ',this.state.calendarsToSync,'\nIncludes: ',this.state.calendarsToSync.includes(storageId));
}

getCalendarsToBeSynced= ()=>{
  const calendarsSummaryToBeSynced = [];
  const calendarsTemp =this.props.options.filter((item)=> this.state.calendarsToSync.includes(item.storageId));
  calendarsTemp.forEach(element => {
    calendarsSummaryToBeSynced.push(element.summary);
  });
  return calendarsSummaryToBeSynced;
}



render() {
    return (
        <View>
            <Text style={styles.title}>Availabe Calendars For Synchronization</Text>
            <FlatList
                style={styles.flatListContainer}
                keyExtractor={(item)=>item.id}
                data={this.props.options}
                extraData={this.state}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>this.setCalendarsToSyncList(item.storageId)}>
                    <Text style={styles.item}>{item.summary}</Text>
                  </TouchableOpacity>
                )}
            />
            <View style={styles.button}>
              <Button
                title="Synchronize Calendars"
                type="solid"
                style={styles.button}
                onPress={this.handleSyncronizeButton}
              />
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: '5%',
    marginStart:'5%'
  },
  flatListContainer: {
    marginTop:'5%',
    height:'60%',
    width:'80%',
    marginLeft:'10%'
  },
  item:{
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    borderRadius: 5
  },
  button:{
    width:'50%',
    marginLeft:'25%',
    marginVertical:'10%'
  }
});