import React, { Component } from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text
} from 'react-native';
import { SearchBar, Tooltip } from 'react-native-elements';
import i18n from 'i18n-js';
import styles from './styles';
import SetLocaleContext from '../../../localization-context';

export default class IndoorMapSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPredictions: true,
      destination: '',
      predictions: [],
      isMounted: false,
      prevCurrentBuilding: '',
      currentBuilding: null
    };
  }

  componentDidMount() {
    SetLocaleContext();
    this.setState({ isMounted: true });
    if (this.props.urCurentLocation !== undefined) {
      this.setState({ destination: this.props.urCurentLocation });
    }
  }


  /**
   * Retrieves predictions through google's from text entered in searchbar.
   * @param {string} destination - Text input from search bar
   */
  async onChangeDestination(destination) {
    this.setState({ destination });
    try {
      if (this.props.currentBuildingPred !== this.state.prevCurrentBuilding) {
        this.setState({
          prevCurrentBuilding: this.props.currentBuildingPred
        });
        await this.updateCurrentBuilding();
      }

      const json = await this.getPredictions(destination);
      const finalPredictions = this.state.currentBuilding !== null && destination !== ''
        ? [
          this.state.currentBuilding,
          ...json.predictions.slice(0, json.predictions.length - 1)
        ]
        : json.predictions;
      this.setState({
        predictions: finalPredictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Retrieves predictions through Google's API for a given string
   * @param {String} destination - String to get predictions for
   * @returns {Promise} - Promise object represents Google's API json response
   */
  async getPredictions(destination) {
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${destination}&location=45.492409, -73.582153&radius=2000`;

    try {
      const result = await fetch(apiUrl);
      return await result.json();
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  render() {
    const placeholder = this.state.isMounted ? i18n.t('search') : 'search';
    // Predictions mapped and formmated from the current state predictions
    const predictions = this.state.predictions.map((prediction) => {
      const getDestinationIfSet = this.props.getDestinationIfSet
        ? this.props.getDestinationIfSet(prediction.description)
        : () => {};
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({
                destination: prediction.description,
                showPredictions: false
              });
              this.getLatLong(prediction.place_id);
              getDestinationIfSet();
              Keyboard.dismiss();
            }}
          >
            <Text key={prediction.id}>{prediction.description}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    /**
     *
     * @param {*} destination
     * Controller function for searchBar component
     * manages contextual text entry
     */
    const onChangeText = (destination) => {
      return this.onChangeDestination(destination);
    };

    const containerStyle = {
      borderRadius: 10,
      borderWidth: 1,
      height: 45,
      justifyContent: 'center'
    };

    return (
      <View style={styles.container}>
        <View>
          <SearchBar
            platform="android"
            autoCorrect={false}
            padding={5}
            returnKeyType="search"
            onSubmitEditing={async () => {
              await this.getNearbyPlaces(this.state.destination);
              this.setState({ showPredictions: false });
            }}
            lightTheme
            containerStyle={containerStyle}
            searchIcon={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={this.state.destination}
            style={styles.searchBar}
            blurOnSubmit
          />
        </View>
        {this.state.showPredictions ? predictions : null}
      </View>
    );
  }
}
