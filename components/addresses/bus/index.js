/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View, Image, Button, Text, Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import shuttleScheduleInformation from '../../home/menu/shuttleBusSchedule/shuttleScheduleService';
import styles from './styles';
import bus from '../../../assets/icons/bus.png';

const HOUR_IN_SECONDS = 3600;
const MINUTE_IN_SECONDS = 60;
export default class Bus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  /**
 * Returns the time of the next shuttle bus.
 * @param {string} campus - Either SGW or LOY.
 * If any other string is passed, by default it will be the SGW campus.
 *
 */
  getNextShuttleBus(campus) {
    const hours = new Date().getHours();
    let min = new Date().getMinutes();

    // We know that the shuttle busses only come at times that are divisible by 5.
    min = (min % 5 !== 0) ? (min - (min % 5) + 5) : min;
    // Converting the current time in seconds
    const totalSeconds = (hours * HOUR_IN_SECONDS) + (min * MINUTE_IN_SECONDS);
    const dataArray = campus === 'LOY' ? shuttleScheduleInformation.Mon_Thu.LOY : shuttleScheduleInformation.Mon_Thu.SGW; // Default SGW

    for (let i = 0; i < dataArray.length; i++) {
      const arrayVal = dataArray[i];
      const totalSecInData = (Number(arrayVal.split(':')[0]) * HOUR_IN_SECONDS) + (Number(arrayVal.split(':')[1] * MINUTE_IN_SECONDS)); // Converting data to seconds
      if ((totalSecInData - totalSeconds) >= 0) { return arrayVal; } // a positive difference
    }
    return dataArray[0]; // Otherwise, return the first shuttle bus
  }

  /**
 * Returns the current time (military style).
 */
  getCurrentTime() {
    const hours = new Date().getHours(); // Current Hours
    const min = new Date().getMinutes(); // Current Minutes
    return `${hours}:${min < 10 ? `0${min}` : min}`; // Adds a 0 to the minutes if minutes is less than 10
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          // return this.props.navigation.navigate('');
          const { clicked } = this.state;
          this.setState({ clicked: !clicked });
          this.props.updateMode('transit');
        }}
        >
          <Image style={styles.currentLocation} source={bus} />
        </TouchableOpacity>
        <Modal visible={this.state.clicked} transparent>
          <View style={styles.modalBackground}>
            <View style={styles.busInfo}>
              <Text style={{ fontSize: 20 }}>Shuttle Bus Services</Text>
              <Text>
                Current Time:
                {' '}
                {this.getCurrentTime()}
              </Text>
              <Text>
                Next Shuttle from Loyola:
                {' '}
                {this.getNextShuttleBus('LOY')}
              </Text>
              <Text>
                Next Shuttle from SGW:
                {' '}
                {this.getNextShuttleBus('SGW')}
              </Text>
              <Button title="Close" onPress={() => { this.setState({ clicked: false }); }} />
            </View>
          </View>
        </Modal>
      </View>


    );
  }
}
