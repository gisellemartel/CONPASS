/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import i18n from 'i18n-js';
import styles from './styles';
import SetLocaleContext from '../../../localization-context';
import fetchBuildingRooms from '../../../indoor_directions_modules/fetchBuildingRooms';

export default class IndoorMapSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      showPredictions: false,
      predictions: [],
      currentBuilding: this.props.currentBuilding,
      currentFloor: this.props.currentFloor.floor,
      currentAvailableRooms: [],
      input: '',
      startPoint: ''
    };
  }

  componentDidMount() {
    SetLocaleContext();
    this.setState({ isMounted: true });
    this.generatePredictionsForSearchBar();
  }

  /**
   * fetches all the possible predictions for start point for the current floor
   */
  generatePredictionsForSearchBar = () => {
    const floors = fetchBuildingRooms(this.state.currentBuilding.building);
    const rooms = floors[this.state.currentFloor];
    const currentAvailableRooms = [];

    rooms.forEach((room) => {
      const roomString = room.toString().replace('_', ' ');
      const displayName = `${this.state.currentBuilding.displayName} ${roomString}`;

      const currentAvailableRoom = {
        id: room,
        description: displayName
      };

      currentAvailableRooms.push(currentAvailableRoom);
    });

    this.setState({
      currentAvailableRooms
    });
  }

  getStartPoint = () => {
    return this.state.startPoint;
  }

  /**
   * Obtains the desired room based on the user search
   */
  fetchStartPoint = () => {
    const userQuery = this.state.input;
    const roomsList = this.state.currentAvailableRooms;

    const searchResult = roomsList.find((room) => {
      return room.description === userQuery;
    });

    this.setState({
      startPoint: searchResult
    });

    console.log(this.state.startPoint);
  }

  /**
   * Retrieves predictions via available data of current floor
   * @param {string} startPoint - Text input from search bar
   */
  onChangeText = (input) => {
    this.setState({
      predictions: []
    });

    const availableRooms = this.state.currentAvailableRooms;
    // passing the inserted text in textinput
    const predictions = availableRooms.filter((room) => {
      // applying filter for the inserted text in search bar
      const roomData = room.description ? room.description.toUpperCase() : ''.toUpperCase();
      const textData = input.toUpperCase();
      return roomData.indexOf(textData) > -1;
    });

    this.setState({
      // setting the filtered newData on datasource
      // After setting the data it will automatically re-render the view
      showPredictions: true,
      predictions,
      input,
    });
  }

  render() {
    const placeholder = this.state.isMounted ? i18n.t('search') : 'search';
    // Predictions mapped and formmated from the current state predictions
    const predictions = this.state.predictions.map((prediction) => {
      return (
        <View key={prediction.id} style={styles.view}>

          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.fetchStartPoint();
              this.setState({
                input: prediction.description,
                showPredictions: false
              });
              Keyboard.dismiss();
            }}
          >
            <Text key={prediction.id}>{prediction.description}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    const containerStyle = {
      borderRadius: 10,
      borderWidth: 1,
      height: 45,
      justifyContent: 'center'
    };

    /**
     * Controller function for searchBar component
     * sets state when search bar is cleared
     */
    const onClear = () => {
      this.setState({ showPredictions: false });
    };

    /**
     * Controller function for searchBar component
     */
    const onBlur = () => {
      this.setState({ showPredictions: false });
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
              this.setState({
                showPredictions: false
              });
            }}
            lightTheme
            containerStyle={containerStyle}
            searchIcon={false}
            placeholder={placeholder}
            onChangeText={this.onChangeText}
            value={this.state.input}
            style={styles.searchBar}
            onClear={onClear}
            onBlur={onBlur}
            blurOnSubmit
          />
        </View>
        {this.state.showPredictions && predictions ? predictions : null}
      </View>
    );
  }
}
