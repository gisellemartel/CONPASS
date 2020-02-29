/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Modal, ScrollView, View, Button, Alert, SectionList, Text
} from 'react-native';
import decodePolyline from 'decode-google-map-polyline';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import shuttleServiceInformation from './shuttleService';
import shuttleScheduleInformation from './shuttleScheduleService';
import styles from './styles';


export default class Shuttle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      errorMessage: null,
      modalVisible: false,
      monThuTableData: this.getTableData(shuttleScheduleInformation.Mth),
      fridayTableData: this.getTableData(shuttleScheduleInformation.Fri)
    };
    this.getCurrentLocation();
  }

  async getDirectionsToShuttleBusStop(destination) {
    await this.getCurrentLocation();
    const { location } = this.state;
    let destCoordinates = [];
    if (destination === 'SGW') { destCoordinates = [shuttleServiceInformation[0].latitude, shuttleServiceInformation[0].longitude]; } else if (destination === 'LOY') { destCoordinates = [shuttleServiceInformation[1].latitude, shuttleServiceInformation[1].longitude]; }
    await this.drawPath([location.coords.latitude, location.coords.longitude], destCoordinates);
  }

  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  getTableData(shuttleTimes) {
    const tableContent = [];
    shuttleTimes.forEach((tableRow) => {
      tableContent.push([tableRow.LOY, tableRow.SGW]);
    });
    return tableContent;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async drawPath(origin, destination) {
    const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk';
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}`;
    try {
      const result = await fetch(directionUrl);
      const json = await result.json();
      const encryptedPath = json.routes[0].overview_polyline.points;
      const { getPolylinePoint } = this.props;
      getPolylinePoint(encryptedPath);
      const rawPolylinePoints = decodePolyline(json.routes[0].overview_polyline.points);
      // Incompatible field names for direct decode. Need to do a trivial conversion.
      const waypoints = rawPolylinePoints.map((point) => {
        return {
          latitude: point.lat,
          longitude: point.lng
        };
      });
      const { coordinateCallback } = this.props;
      coordinateCallback(waypoints);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View>
            <Button
              title="Close"
              onPress={() => { this.setModalVisible(false); }}
            />
            <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
              <View>
                <Text style={styles.title}>Shuttle Bus Schedule</Text>
                <SectionList
                  sections={[
                    {
                      title: 'Sir George Williams Campus',
                      data: ['7:45',
                        '8:05',
                        '8:20',
                        '8:35',
                        '8:55',
                        '9:10',
                        '9:30',
                        '9:45',
                        '10:05',
                        '10:20',
                        '10:55',
                        '11:10',
                        '11:45',
                        '12:00',
                        '12:30',
                        '13:00',
                        '13:30',
                        '14:00',
                        '14:30',
                        '15:00',
                        '15:30',
                        '16:00',
                        '16:30',
                        '17:00',
                        '17:30',
                        '18:00',
                        '18:30',
                        '19:00',
                        '19:30',
                        '20:00',
                        '20:10',
                        '20:30',
                        '21:00',
                        '21:25',
                        '21:45',
                        '22:00',
                        '22:30',
                        '23:00']
                    },
                    {
                      title: 'Loyola Campus',
                      data: ['7:30',
                        '7:40',
                        '7:55',
                        '8:20',
                        '8:35',
                        '8:55',
                        '9:10',
                        '9:30',
                        '9:45',
                        '10:20',
                        '10:35',
                        '10:55',
                        '11:10',
                        '11:30',
                        '12:00',
                        '12:30',
                        '13:00',
                        '13:30',
                        '14:00',
                        '14:30',
                        '15:00',
                        '15:30',
                        '16:00',
                        '16:30',
                        '17:00',
                        '17:30',
                        '18:00',
                        '18:30',
                        '19:00',
                        '19:30',
                        '20:00',
                        '20:00',
                        '20:30',
                        '20:45',
                        '21:05',
                        '21:30',
                        '22:00',
                        '22:30',
                        '23:00',
                        '']
                    },
                  ]}
                  renderItem={({ item }) => { return <Text style={styles.item}>{item}</Text>; }}
                  renderSectionHeader={
                    ({ section }) => {
                      return <Text style={styles.sectionHeader}>{section.title}</Text>;
                    }
}
                  keyExtractor={(item, index) => { return index; }}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View style={styles.btn}>
          <Button
            title="Shuttle Bus Information"
            onPress={() => { this.setModalVisible(true); }}
          />
          <Button
            title="Get Shuttle Bus Directions"
            onPress={() => {
              Alert.alert(
                'Select the Campus',
                'Which campus would you like to get directions to the Shuttle Bus Stop?',
                [
                  { text: 'SGW', onPress: () => { this.getDirectionsToShuttleBusStop('SGW'); } },
                  { text: 'LOY', onPress: () => { this.getDirectionsToShuttleBusStop('LOY'); } },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      </View>
    );
  }
}
