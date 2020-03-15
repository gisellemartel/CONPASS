/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View, Image, Button, Text, Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import shuttleScheduleInformation from '../../home/menu/shuttleBusSchedule/shuttleScheduleService';
import styles from './styles';
import bus from './bus.png';


export default class Bus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  getNextShuttleBus(campus) {
    const hours = new Date().getHours();
    let min = new Date().getMinutes();
    if (min % 5 !== 0) {
      min = min - (min % 5) + 5;
    }
    const time = `${hours}:${min < 10 ? `0${min}` : min}`;
    console.log(time);

    const secHours = hours * 3600;
    const secMin = min * 60;
    const secTotal = secHours + secMin;
    let dataArray;
    if (campus === 'LOY') {
      dataArray = shuttleScheduleInformation.Mon_Thu.LOY;
    } else if (campus === 'SGW') {
      dataArray = shuttleScheduleInformation.Mon_Thu.SGW;
    }
    for (let i = 0; i < dataArray.length; i++) {
      const arrayVal = dataArray[i];
      const totalsecInarr = (Number(arrayVal.split(':')[0]) * 3600) + (Number(arrayVal.split(':')[1] * 60));
      if ((totalsecInarr - secTotal) > 0) { return arrayVal; }
    }
    return dataArray[0];
  }

  getCurrentTime() {
    const hours = new Date().getHours(); // Current Hours
    const min = new Date().getMinutes(); // Current Minutes
    return `${hours}:${min < 10 ? `0${min}` : min}`;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          // return this.props.navigation.navigate('');
          const { clicked } = this.state;
          this.setState({ clicked: !clicked });
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
