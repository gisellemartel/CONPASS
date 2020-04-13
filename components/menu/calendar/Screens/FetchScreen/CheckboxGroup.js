import React, { Component } from 'react';
import { View,FlatList, AsyncStorage, Text,TouchableOpacity, CheckBox } from 'react-native';
import { Checkbox,ListItem } from 'react-native-elements'


export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);

    this.state={
      checkedList: []
    }
}
setCalendarsToSyncList = (storageId)=>{
  console.log('event pressed ',storageId);
}
render() {
    return (
        <View>
            <FlatList
                keyExtractor={(item)=>item.id}
                data={this.props.options}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>this.setCalendarsToSyncList(item.storageId)}>
                    <Text>{item.summary}</Text>
                  </TouchableOpacity>
                )}
            />
        </View>
    );
  }
}