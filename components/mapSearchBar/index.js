/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import i18n from 'i18n-js';
import styles from './styles';
import SetLocaleContext from '../../SetLocaleContext';
import burger from '../../assets/icons/burger.png';

export class MapSearchBar extends Component {
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
      prevCurrentBuilding: ''
    };
  }

  componentDidMount() {
    SetLocaleContext();
    this.setState({ isMounted: true });
    if (
      this.props.hideMenu === undefined
      || this.props.setCampusToggleVisibility === undefined
    ) {
      this.setState({ hideMenu: true });
    } else {
      this.setState({ hideMenu: false });
    }

    if (this.props.startDescription) {
      this.setState({ destination: this.props.startDescription });
    } else if (this.props.urCurentLocation !== undefined) {
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
      let currentBuilding;
      let prevCurrBuilding;
      if (this.props.currentBuildingPred !== this.state.prevCurrentBuilding) {
        currentBuilding = await this.updateCurrentBuilding();
        prevCurrBuilding = this.props.currentBuildingPred;
      }

      const json = await this.getGoogleApiPredictions(destination);
      const allPredictions = this.generateAllContextualPredictions(currentBuilding, destination.toLowerCase(), json.predictions);

      if (prevCurrBuilding) {
        this.setState({
          prevCurrentBuilding: prevCurrBuilding,
          predictions: allPredictions
        });
      } else {
        this.setState({
          predictions: allPredictions
        });
      }
    } catch (err) {
      console.error(err);
    }
  }


  /**
   * Retrieves predictions through Google's API for a given string
   * @param {String} destination - String to get predictions for
   * @returns {Promise} - Promise object represents Google's API json response
   */
  async getGoogleApiPredictions(destination) {
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


  /**
   * Gets the latitude and longitude of a chosen prediction.
   * @param {string} prediction - placeid of the prediction to get latitude and longitude.
   */
  async getLatLong(prediction) {
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${prediction}`;

    try {
      const georesult = await fetch(geoUrl);
      const gjson = await georesult.json();
      const locations = gjson.result.geometry.location;
      this.setState({
        region: {
          latitude: locations ? locations.lat : 45.492409,
          longitude: locations ? locations.lng : -73.582153,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }
      });
      this.props.updateRegion(this.state.region);
      if (this.props.drawPath) {
        this.props.drawPath();
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Concatenates custom indoor predictions with predictions from Google API
   * @param {string} - destination entered by user in search bar
   * @param {string} - googleApiPredictions
   */
  generateAllContextualPredictions(currentBuilding, destination, googleApiPredictions) {
    if (destination.length === 0) {
      return [];
    }

    const { indoorRoomsList } = this.props;

    if (indoorRoomsList) {
      const MAX_NUM_PREDICTIONS = 6;
      // contextual predictions based on user query

      if (googleApiPredictions && googleApiPredictions.length > 0) {
      // return mix of both google and relevant indoor predictions
        const googlePredictions = googleApiPredictions.slice(0, 2);

        const allPredictions3 = googlePredictions.concat(predictions.slice(0, MAX_NUM_PREDICTIONS));

        return allPredictions3;
      }

      return predictions.slice(0, MAX_NUM_PREDICTIONS);
    }
    const allPredictions = googleApiPredictions;
    return allPredictions;
  }


  /**
   * Sets currentBuilding state with a prediction of the current building the user is in
   */
  async updateCurrentBuilding() {
    try {
      const json = await this.getGoogleApiPredictions(this.props.currentBuildingPred);

      if (json.predictions.length > 0) {
        return json.predictions[0];
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  render() {
    const placeholder = 'Search for a place';
    // Predictions mapped and formmated from the current state predictions
    const predictions = this.state.predictions && this.state.predictions.length > 0 ? this.state.predictions.map((prediction) => {
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
              if (this.props.getDestinationIfSet) {
                this.props.getDestinationIfSet(prediction.description);
              }
              Keyboard.dismiss();
            }}
          >
            <Text key={prediction.id}>{prediction.description}</Text>
          </TouchableOpacity>
        </View>
      );
    }) : null;

    const searchIcon = this.state.hideMenu && (
      <Icon navigation={this.props.navigation} />
    );

    /**
     *
     * @param {*} destination
     * Controller function for searchBar component
     * manages contextual text entry
     */
    const onChangeText = (destination) => {
      return this.onChangeDestination(destination);
    };

    /**
     * Controller function for searchBar component
     * sets state when search bar is cleared
     */
    const onClear = () => {
      // Clear markers on the map
      if (this.props.nearbyMarkers) { this.props.nearbyMarkers([]); }

      this.setState({
        showPredictions: true,
      });
    };

    /**
     * Controller function for searchBar component
     */
    const onBlur = () => {
      if (this.props.setCampusToggleVisibility) {
        this.props.setCampusToggleVisibility(false);
      }
    };

    const containerStyle = {
      borderRadius: 30,
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
            searchIcon={!this.props.hideMenu && searchIcon}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={this.state.destination}
            style={styles.SearchBar}
            onClear={onClear}
            onBlur={onBlur}
            blurOnSubmit
          />
        </View>
        {this.state.showPredictions && this.state.predictions ? predictions : null}
      </View>
    );
  }
}

const Icon = (props) => {
  return (
    <TouchableHighlight
      onPress={() => {
        return props.navigation.navigate('Menu');
      }}
    >
      <Image style={styles.burger} source={burger} />
    </TouchableHighlight>
  );
};

export default MapSearchBar;
