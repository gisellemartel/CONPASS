import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import CheckboxGroup from './CheckboxGroup';

export default class FetchScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      calendarsGeneralInfo :  [],
    };
    //this.getDatta=this.getDatta.bind(this);
  }

  componentDidMount() {
        console.log('length:');
    console.log(this.state.calendarsGeneralInfo.length);
    this.getDatta();
    if (this.state.calendarsGeneralInfo.length == 0) {
      console.log('am here');
       this.forceUpdate();
    }
    this.getData();

  }


  getDatta() {
    if (this.props.navigation.state.params) {
      this.setState({ calendarsGeneralInfo: this.props.navigation.state.params.userCalendarsInfo },
        () => { this.forceUpdate(); });
      this.forceUpdate();
      return (
        <View>
          <CheckboxGroup options={this.state.calendarsGeneralInfo} />
        </View>
      );
    }
  }

  getData = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);
  //this.props.navigation.navigate('DashboardScreen', { events });
  }
navigationHandler=async(events)=>{
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
       {this.props.navigation.state.params? <CheckboxGroup options={this.state.calendarsGeneralInfo} navigationHandlerCallback={this.navigationHandler}/> : <ActivityIndicator />}
      </View>
    );
  }
}
