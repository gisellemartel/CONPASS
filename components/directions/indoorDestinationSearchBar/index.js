/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text
} from 'react-native';
import i18n from 'i18n-js';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setEndBuildingNode } from '../../../store/actions';
import styles from './styles';

class IndoorDestinationSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      showPredictions: true,
      predictions: [],
    };
  }

  /**
  * Retrieves predictions through google's from text entered in searchbar.
  * @param {string} destination - Text input from search bar
  */
  async onChangeDestination(destination) {
    this.setState({ destination });
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${destination}&location=45.492409, -73.582153&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();

      const allPredictions = this.generateAllContextualPredictions(destination.toLowerCase(),
        json.predictions);

      this.setState({
        predictions: allPredictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Concatenates custom indoor predictions with predictions from Google API
   * @param {string} - destination entered by user in search bar
   * @param {string} - googleApiPredictions
   */
  generateAllContextualPredictions(destination, googleApiPredictions) {
    if (destination.length === 0) {
      return [];
    }

    const { indoorRoomsList } = this.props;
    const MAX_NUM_PREDICTIONS = 5;
    // contextual predictions based on user query
    const predictions = indoorRoomsList.filter((room) => {
      const roomData = room.description ? room.description.toUpperCase() : ''.toUpperCase();
      const textData = destination.toUpperCase();
      return roomData.indexOf(textData) > -1;
    });

    // if H- or VL- prefix entered by user only show relevant indoor predictions
    if (destination.startsWith('h-') || destination.startsWith('vl-')) {
      return predictions.slice(0, MAX_NUM_PREDICTIONS);
    }

    if (predictions.length === 0) {
      return googleApiPredictions;
    }

    // return mix of both google and relevant indoor predictions
    const googlePredictions = googleApiPredictions.slice(0, 2);
    const indoorPredictions = predictions.slice(0, 3);
    const mixedPredictions = indoorPredictions.concat(googlePredictions);

    return mixedPredictions;
  }

  /**
   * Send the prediction to redux global store for components to update
   * @param {object} prediction object
   */
  async sendNodeToRedux(prediction) {
    const modifiedPrediction = prediction;
    let coordinates;
    if (!prediction.dijkstraId) {
      const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
      const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${prediction.place_id}`;
      const georesult = await fetch(geoUrl);
      const gjson = await georesult.json();

      coordinates = {
        latitude: gjson.result.geometry.location.lat,
        longitude: gjson.result.geometry.location.lng,
      };
      modifiedPrediction.coordinates = coordinates;
    }
    this.props.setEndBuildingNode(modifiedPrediction);
  }

  render() {
    const placeholder = this.state.isMounted ? i18n.t('destinationSearch') : 'Choose your destination';
    const predictions = this.state.predictions ? this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({ destination: prediction.description });
              this.setState({ showPredictions: false });
              this.sendNodeToRedux(prediction);
              Keyboard.dismiss();
            }}
          >
            <Text key={prediction.id}>{prediction.description}</Text>
          </TouchableOpacity>
        </View>
      );
    }) : null;

    const onBlur = () => {
      this.setState({
        showPredictions: false,
      });
    };

    const showPredictions = () => {
      this.setState({
        showPredictions: true,
      });
    };

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
            onTouchStart={showPredictions}
            onBlur={onBlur}
            onClear={showPredictions}
            blurOnSubmit
          />
        </View>
        {
          this.state.showPredictions && predictions
            ? predictions : null
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEndBuildingNode: (prediction) => { dispatch(setEndBuildingNode(prediction)); },
  };
};

export default connect(null, mapDispatchToProps)(IndoorDestinationSearchBar);
