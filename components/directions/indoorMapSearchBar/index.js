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

  /**
   * Retrieves predictions via available data of current floor
   * @param {string} startPoint - Text input from search bar
   */
  onChangeText = (startPoint) => {
    this.setState({
      predictions: []
    });
    const predictions = [];
    // TODO: logic for contextual search to go here
    this.state.currentAvailableRooms.forEach((room) => {
      const { description } = room;
      // TODO use regex?
      if (startPoint.length < description.length) {
        let ctr = 0;

        for (let i = 0; i < startPoint.length; i++) {
          console.log(startPoint);
          console.log(description);
          if (startPoint[i] !== description[i]) {
            break;
          } else {
            ctr++;
          }
        }

        const isValidQuery = ctr > 0;

        if (isValidQuery) {
          predictions.push(room);
        }
      }
    });


    this.setState({
      startPoint,
      showPredictions: true,
      predictions
    });

    if (this.state.predictions) {
      console.log(this.state.predictions);
    }
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
              this.setState({
                startPoint: prediction,
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
            value={this.state.startPoint}
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
