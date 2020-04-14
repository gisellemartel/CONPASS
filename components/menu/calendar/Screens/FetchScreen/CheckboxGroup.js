import React, { Component } from 'react';
import { View,FlatList, ScrollView, AsyncStorage, Text,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Checkbox,ListItem } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);

    this.state={
      itemsSelected: [],
      buttonColor: 'black',
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

handleSyncronizeButton=async ()=>{
  Alert.alert('The following calendars will be synchronized',
  `${this.getCalendarsToBeSynced()}`,
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => this.navigateToDashboardScreen() }
  ],
  { cancelable: false });
}
navigateToDashboardScreen = async()=>{
  const events = await this.getFinalEventsArray();
  this.saveFinalEventsArray(events);
  this.props.navigationHandlerCallback(events);
}

saveFinalEventsArray= async(finalCalendar)=>{
  const stringFile = JSON.stringify(finalCalendar);
  AsyncStorage.setItem('events', stringFile);
}
getFinalEventsArray= async()=>{
  if(this.state.calendarsToSync.length !== 0){
    let startIndex = 0;
    do{
      const evnts = await AsyncStorage.getItem(this.state.calendarsToSync[startIndex]);
      var finalCalendarToBeSynced = JSON.parse(evnts);
      startIndex++;
    }while(('error' in finalCalendarToBeSynced) && startIndex < this.state.calendarsToSync.length)
    //console.log('test: ',finalCalendarToBeSynced);
    let i;
    for(i=1; i<this.state.calendarsToSync.length; i++){
      const tempEvnts = await AsyncStorage.getItem(this.state.calendarsToSync[i]);
      let tempCalendarToBeMerged = JSON.parse(tempEvnts);

      if('items' in tempCalendarToBeMerged){
        finalCalendarToBeSynced.items = (finalCalendarToBeSynced.items).concat(tempCalendarToBeMerged.items);
      }
    }

    if('error' in finalCalendarToBeSynced){
      finalCalendarToBeSynced = {items:[]};
    }
    //console.log(finalCalendarToBeSynced);
  }else{
    finalCalendarToBeSynced = {items:[]};
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
                keyExtractor={(item)=>item.id}
                data={this.props.options}
                extraData={this.state}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>{ this.setCalendarsToSyncList(item.storageId); this.forceUpdate();}}>
                    <Text id={item.id}
                      style={{
                        marginTop: 24,
                        padding: 30,
                        backgroundColor: this.state.calendarsToSync.includes(item.storageId) ? '#EEB462' : 'rgba(156,211,215,0.95)',
                        fontSize: 24,
                        overflow: 'hidden',
                        borderRadius: 10}}>
                          {item.summary}
                    </Text>
                  </TouchableOpacity>
                  
                )}
            />
           
              <Button
                title="Synchronize Calendars"
                type="solid"
                style={styles.button}
                onPress={this.handleSyncronizeButton}
              />
            

        </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%'
  }
});