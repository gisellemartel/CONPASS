import React, { Component } from 'react';
import { View,FlatList, AsyncStorage, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox,ListItem } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);

    this.state={
      checkedList: [],
      itemColor: 'pink'
    }
}
setCalendarsToSyncList = (storageId)=>{
  console.log('event pressed ',storageId);
  this.setState({itemColor:'red'});
}
render() {
    return (
        <View>
            <Text style={styles.title}>Availabe Calendars For Synchronization</Text>
            <FlatList
                style={styles.flatListContainer}
                keyExtractor={(item)=>item.id}
                data={this.props.options}
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
    fontSize: 24
  },
  button:{
    width:'50%',
    marginLeft:'25%',
    marginVertical:'10%'
  }
});