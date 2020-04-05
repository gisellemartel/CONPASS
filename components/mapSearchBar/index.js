import React, { Component } from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import { SearchBar, Tooltip } from 'react-native-elements';
import i18n from 'i18n-js';
import styles from './styles';
import SetLocaleContext from '../../localization-context';
import burger from '../../assets/icons/burger.png';

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
      prevCurrentBuilding: '',
      currentBuilding: null
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
      const { currentBuilding } = this.state;
      const finalPredictions = currentBuilding !== null && destination !== ''
        ? [
          currentBuilding,
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
  // eslint-disable-next-line consistent-return
  async getPredictions(destination) {
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${destination}&location=45.492409, -73.582153&radius=2000`;

    try {
      const result = await fetch(apiUrl);
      return await result.json();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Retreives location points (lat, lg) of places around SGW or LOY
   * depending on what the user searches for
   * @param {string} value - Value of whatever is inputed into the search bar
   */
  async getNearbyPlaces(value) {
    if (value.toLowerCase().includes('near sgw') || value.toLowerCase().includes('near loy')) {
      const formattedVal = value.substring(0, value.indexOf('near')).trim().replace(' ', '+');
      if (value.toLowerCase().includes('sgw')) {
        this.setState({
          region: {
            latitude: 45.492409,
            longitude: -73.582153,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }
        }, () => { this.setNearbyPlaces(formattedVal); });
      } else { // 'Loy' case
        this.setState({
          region: {
            latitude: 45.458295,
            longitude: -73.640353,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }
        }, () => { this.setNearbyPlaces(formattedVal); });
      }
    }
  }

  /**
   * Sets marker points (lat, lg) of places around SGW or LOY
   * that correspond to what user is searching for
   * @param {string} formattedVal - Amenity that user is looking for
   */
  async setNearbyPlaces(formattedVal) {
    const markers = [];
    const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${formattedVal}&location=${this.state.region.latitude},${this.state.region.longitude}&radius=2&key=${key}`;
    const georesult = await fetch(url);
    const gjson = await georesult.json();
    // pushing object to the markers. This is what is passed in the props
    gjson.results.map((result) => {
      return (markers.push({
        id: result.id,
        title: result.name,
        description: result.formatted_address,
        coordinates: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        }
      }));
    });
    if (markers.length > 0) {
      // Updating the view
      this.props.updateRegion(this.state.region);
      this.props.nearbyMarkers(markers);
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
   * Sets currentBuilding state with a prediction of the current building the user is in
   */
  async updateCurrentBuilding() {
    try {
      const json = await this.getPredictions(this.props.currentBuildingPred);

      if (json.predictions.length > 0) {
        this.setState({
          currentBuilding: json.predictions[0]
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const placeholder = this.state.isMounted ? i18n.t('search') : 'search';
    // Predictions mapped and formmated from the current state predictions
    const predictions = this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => {
              this.setState({ destination: prediction.description });
              if (this.props.getDestinationIfSet) {
                this.props.getDestinationIfSet(prediction.description);
              }
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
      this.setState({ showPredictions: true });

      // Clear markers on the map
      if (this.props.nearbyMarkers) { this.props.nearbyMarkers([]); }
    };

    /**
     * Controller function for searchBar component
     * Defines UI behaviour of component when triggered by touch event
     */
    const onTouchStart = () => {
      if (this.props.setCampusToggleVisibility) {
        this.props.setCampusToggleVisibility(true);
      }
      // Clear markers on the map
      if (this.props.nearbyMarkers) { this.props.nearbyMarkers([]); }
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
      borderRadius: 10,
      borderWidth: 1,
      height: 45,
      justifyContent: 'center'
    };

    return (
      <View style={styles.container}>
        <View>
          <Tooltip
            backgroundColor="#b5e3e6"
            height={100}
            popover={(
              <Text>
                Include
                <Text style={{ fontWeight: 'bold' }}> &quot;near LOY&quot;</Text>
                {' '}
                or
                <Text style={{ fontWeight: 'bold' }}> &quot;near SGW&quot;</Text>
                {' '}
                to find places around campus!
              </Text>
            )}
          >
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
              onTouchStart={onTouchStart}
              onBlur={onBlur}
              blurOnSubmit
            />
          </Tooltip>

        </View>
        {this.state.showPredictions ? predictions : null}
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
