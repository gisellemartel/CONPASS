import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity,TextInput, Text
} from 'react-native';
import i18n from 'i18n-js';
import { SearchBar } from 'react-native-elements';
import decodePolyline from 'decode-google-map-polyline';
import styles from './styles';

export default class searchBarDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPredictions: true,
      destination: '',
      predictions: [],
      locations: '',
      destinationRegion: {
        latitude: 0,
        longitude: 0,
  
      }
    };
  }

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

  async getLatLong(prediction) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ description: prediction });
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${prediction}`;

    try {
      const georesult = await fetch(geoUrl);
      const gjson = await georesult.json();
      this.setState({ locations: gjson.result.geometry.location });
      this.setState({
        destinationRegion: {
          latitude: this.state.locations.lat,
          longitude: this.state.locations.lng,

        }
      });  
      this.drawPath();
    } catch (err) {
      console.error(err);
    }
  }


    async drawPath() {
    const key = 'AIzaSyBsMjuj6q76Vcna8G5z9PDyTH2z16fNPDk'; 
    const originLat= this.props.updatedRegion.latitude;
    const originLong= this.props.updatedRegion.longitude;
    const destinationLat=this.state.destinationRegion.latitude;
    const destinationLong=this.state.destinationRegion.longitude;
    const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?key=${key}&origin=${originLat},${originLong}&destination=${destinationLat},${destinationLong}`;
    try {
      const result = await fetch(directionUrl);
      const json = await result.json();
      const encryptedPath = json.routes[0].overview_polyline.points;
      this.props.getPolylinePoint(encryptedPath);
      const rawPolylinePoints = decodePolyline(json.routes[0].overview_polyline.points);
      // Incompatible field names for direct decode. Need to do a trivial conversion.
      const waypoints = rawPolylinePoints.map((point) => {
        return {
          latitude: point.lat,
          longitude: point.lng
        };
      });
      // const { coordinateCallback } = this.props;
      this.props.coordinateCallback(waypoints);
    } catch (err) {
      console.error(err);
    }
  }


  render() {
    const placeholder = this.state.isMounted ? i18n.t('search') : 'where do you want to go to?';
    const predictions = this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({ destination: prediction.description });
              this.getLatLong(prediction.place_id);
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
          platform='android'
            lightTheme
            placeholder={placeholder}
            onChangeText={(destination) => {
                destination.length === 0
                ? this.props.changeVisibilityTo(true) :this.props.changeVisibilityTo(false)
              return this.onChangeDestination(destination);
            }}
            value={this.state.destination}
            style={styles.SearchBar}
            onClear={() => {
              this.setState({ showPredictions: true });
            this.props.changeVisibilityTo(false);

            }}
            onTouchStart={
              () => {
                this.props.changeVisibilityTo(true);
              }
            }
            onBlur={() => { this.props.changeVisibilityTo(false); }}
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