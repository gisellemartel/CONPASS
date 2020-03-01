/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text, TouchableHighlight,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import i18n from 'i18n-js';
import styles from './styles';

import SetLocaleContext from '../../localization-context';
import burger from './burger.png';

export default class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPredictions: true,
      destination: '',
      predictions: [],
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      isMounted: false,
    };
  }

  componentDidMount() {
    SetLocaleContext();
    this.setState({ isMounted: true });
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
      const locations = gjson.result?.geometry?.location;
      console.log(gjson.result?.geometry?.location);
      this.setState({
        region: {
          latitude: locations ? locations.lat : 45.492409,
          longitude: locations ? locations.lng : -73.582153,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }
      });
      console.log(this.state.region);
      this.props.updateRegion(this.state.region);
    } catch (err) {
      console.error(err);
    }
  }


  render() {
    const placeholder = this.state.isMounted ? i18n.t('search') : 'Search...';

    const predictions = this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({ destination: prediction.description });
              this.getLatLong(prediction.place_id);
              this.setState({ showPredictions: false });
              this.props.changeVisibilityTo(false);
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
            searchIcon={<Icon navigation={this.props.navigation} />}
            lightTheme
            placeholder={placeholder}
            onChangeText={(destination) => {
              destination.length === 0
                ? this.props.changeVisibilityTo(true) : this.props.changeVisibilityTo(false);
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

const Icon = (props) => {
  return (
    <TouchableHighlight onPress={() => { return props.navigation.navigate('Menu'); }}>
      <Image style={styles.burger} source={burger} />
    </TouchableHighlight>
  );
};
