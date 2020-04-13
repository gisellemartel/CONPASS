import React, { Component } from 'react';
import { View,FlatList, AsyncStorage, Text,ActivityIndicator, CheckBox } from 'react-native';
import { Checkbox,ListItem } from 'react-native-elements'


export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);

    this.state={
      checkedList: []
    }
}

render() {
    console.log('Checkbox ',this.props.options);
    return (
        <View>
            <FlatList
                keyExtractor={(item)=>item.id}
                data={this.props.options}
                renderItem={({item}) => (<Text>{item.summary}</Text>)}
            />
        </View>
    );
  }
}