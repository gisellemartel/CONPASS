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

        </View>
    );
  }
}

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop:'10%',
    height:'80%',
    width:'80%',
    marginLeft:'10%'
  },
  item:{
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  }
});