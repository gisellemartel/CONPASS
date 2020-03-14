import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text
} from 'react-native';
import i18n from 'i18n-js';
import { SearchBar } from 'react-native-elements';
import decodePolyline from 'decode-google-map-polyline';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class searchBarDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      showPredictions: true,
      destination: '',
      predictions: [],
      destinationRegion: {
        latitude: 45.492409,
        longitude: -73.582153,
      },
    };
  }

   componentDidMount() {
    this.setState({ isMounted: true });}

  async onChangeDestination(destination) {
    this.setState({ destination });
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${destination}&location=45.492409, -73.582153&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

    async getCurrentLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        errorMessage: 'Permission to access location was denied',
      });
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  async drawPath(prediction) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ description: prediction });
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${prediction}`;

    try {
        await this.getCurrentLocation();
        const { location } = this.state;
        const urLatitude=location.coords.latitude;
        const urLongitude=location.coords.longitude; 
        const georesult = await fetch(geoUrl);
        const gjson = await georesult.json();
      this.setState({
        destinationRegion: {
          latitude: gjson.result.geometry.location.lat,
          longitude: gjson.result.geometry.location.lng,
        }
      });
      // eslint-disable-next-line no-shadow
      const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk';
      // change to current location later
      const originLat = this.props.updatedRegion.latitude === 0 ? urLatitude : this.props.updatedRegion.latitude;
      const originLong = this.props.updatedRegion.longitude === 0 ? urLongitude : this.props.updatedRegion.longitude;
      const destinationLat = this.state.destinationRegion.latitude;
      const destinationLong = this.state.destinationRegion.longitude;
      const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${originLat},${originLong}&destination=${destinationLat},${destinationLong}`;
      const result = await fetch(directionUrl);
      const json = await result.json();
      const encryptedPath = json.routes[0].overview_polyline.points;
      const rawPolylinePoints = decodePolyline(encryptedPath);
      // Incompatible field names for direct decode. Need to do a trivial conversion.
      const waypoints = rawPolylinePoints.map((point) => {
        return {
          latitude: point.lat,
          longitude: point.lng
        };
      });
      console.log(waypoints);
      this.props.coordinateCallback(waypoints);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const placeholder = this.state.isMounted ? i18n.t('destinationSearch') : 'Choose your destination';
    const predictions = this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({ destination: prediction.description });
              this.drawPath(prediction.place_id);
              this.setState({ showPredictions: false });
              Keyboard.dismiss();
            }}
          >
            <Text key={prediction.id}>{prediction.description}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View>
          <SearchBar
            platform="android"
            lightTheme
            searchIcon={null}
            containerStyle={{
              borderRadius: 10,
              borderWidth: 1,
              height: 45,
              justifyContent: 'center'
            }}
            placeholder={placeholder}
            onChangeText={(destination) => {
              return this.onChangeDestination(destination);
            }}
            value={this.state.destination}
            onClear={() => {
              this.setState({ showPredictions: true });
            }}
            blurOnSubmit
          />
        </View>
        {
          this.state.showPredictions
            ? predictions : null
        }
      </View>
    );
  }
}
