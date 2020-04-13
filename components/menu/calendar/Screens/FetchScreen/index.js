import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import CheckboxGroup from './CheckboxGroup';

export default class FetchScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      calendarsGeneralInfo : [{id:'1',summary:'A',storageId:'events1'},{id:'2',summary:'B',storageId:'events2'},{id:'3',summary:'C',storageId:'events3'}]
    }
  }

  componentDidMount() {
    this.getData();
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
