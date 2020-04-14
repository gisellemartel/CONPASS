import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
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
    //console.log('length:');
    console.log(this.state.calendarsGeneralInfo.length);
    this.getDatta();
    if (this.state.calendarsGeneralInfo.length === 0) {
      //console.log('am here');
      this.forceUpdate();
    }
    console.log('--!!!_--~~~~-  The moment of truth ');
    this.asyncStorageChecker();
  }

  // eslint-disable-next-line consistent-return
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

  asyncStorageChecker = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);

    if(evnts != null){
      this.props.navigation.navigate('DashboardScreen', { events });
    }else{
      console.log('Check AsyncStorage. evnts is null!');
    }
  }

navigationHandler=async (events) => {
  this.props.navigation.navigate('DashboardScreen', { events });
}

render() {
  console.log('in render');
  //console.log(this.state.calendarsGeneralInfo);

  return (
    <View>
      {this.props.navigation.state.params
        // eslint-disable-next-line react/jsx-wrap-multilines
        ? <CheckboxGroup
          options={this.state.calendarsGeneralInfo}
          navigationHandlerCallback={this.navigationHandler}
        />
        : <ActivityIndicator />}
    </View>
  );
}
}
