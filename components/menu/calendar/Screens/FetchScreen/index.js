import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import CheckboxGroup from './CheckboxGroup';

export default class FetchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarsGeneralInfo: [],
    };
    //this.getDatta=this.getDatta.bind(this);
  }

  componentDidMount() {
    this.getDatta();
    this.getData();
  }

  getData = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);
    this.props.navigation.navigate('DashboardScreen', { events });
  }

  getDatta() {
    if (this.props.navigation.state.params) {
      console.log('am here');
      console.log(this.props.navigation.state.params.userCalendarsInfo);
      this.setState({ calendarsGeneralInfo: this.props.navigation.state.params.userCalendarsInfo });
      console.log('after am here:');
      console.log(this.state.calendarsGeneralInfo);
    }
  }

  render() {
    console.log('in render');
    console.log(this.state.calendarsGeneralInfo);
    return (
      <View>
        <CheckboxGroup options={this.state.calendarsGeneralInfo}/>
      </View>
    );
  }
}
