import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import CheckboxGroup from './CheckboxGroup';

export default class FetchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarsGeneralInfo: [],
    };
  }

  componentDidMount() {
    this.getUserCalendarsGeneralData();
    if (this.state.calendarsGeneralInfo.length === 0) {
      this.forceUpdate();
    }
    this.asyncStorageChecker();
  }

  /**
 * This function returns the CheckboxGroup component
 */
  getUserCalendarsGeneralData() {
    if (this.props.navigation.state.params) {
      this.setState({ calendarsGeneralInfo: this.props.navigation.state.params.userCalendarsInfo },
        () => { this.forceUpdate(); });
      this.forceUpdate();
      return (
        <View>
          <CheckboxGroup options={this.state.calendarsGeneralInfo} />
        </View>
      );
    } return null;
  }

  /**
   * This function checks if events item exists in the JSON file.
   */
  asyncStorageChecker = async () => {
    const evnts = await AsyncStorage.getItem('events');
    const events = JSON.parse(evnts);

    if (evnts !== null) {
      this.props.navigation.navigate('DashboardScreen', { events });
    } else {
      firebase.auth().signOut();
    }
  }

/**
 * The function handles navigation to DashboardScreen.
 * It's used as a callback function from CheckboxGroup
 * @param {String} events - A stringified events array.
 */
navigationHandler=async (events) => {
  this.props.navigation.navigate('DashboardScreen', { events });
}

render() {
  return (
    <View>
      {this.props.navigation.state.params
        ? (
          <CheckboxGroup
            options={this.state.calendarsGeneralInfo}
            navigationHandlerCallback={this.navigationHandler}
          />
        )
        : <ActivityIndicator />}
    </View>
  );
}
}
