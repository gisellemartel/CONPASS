import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import CheckboxGroup from './CheckboxGroup';

export default class FetchScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      calendarsGeneralInfo : [{id:'1',summary:'A',storageId:'events1'},{id:'2',summary:'B',storageId:'events2'},{id:'3',summary:'C',storageId:'events3'},{id:'4',summary:'D',storageId:'events4'},{id:'5',summary:'E',storageId:'events5'},{id:'6',summary:'F',storageId:'events6'},{id:'7',summary:'G',storageId:'events7'}]
    };
    this.getDatta=this.getDatta.bind(this);
  }

  componentDidMount() {
    this.getDatta();
    this.getData();
  }
  getDatta(){
    console.log('user calendar info:');
    console.log(this.props.navigation.state.params.userCalendarsInfo);
  }

  getData = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);
    //this.props.navigation.navigate('DashboardScreen', { events });
  }

  render() {
    return (
      <View>
        <CheckboxGroup options={this.state.calendarsGeneralInfo}/>
      </View>
    );
  }
}
