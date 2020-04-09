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

export default class IndoorMapSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      showPredictions: false,
      predictions: [],
      currentBuilding: this.props.currentBuilding,
      currentFloor: this.props.currentFloor,
      startPoint: ''
    };
  }

  componentDidMount() {
    SetLocaleContext();
    this.setState({ isMounted: true });
  }


  /**
   * Retrieves predictions via available data of current floor
   * @param {string} startPoint - Text input from search bar
   */
  async onChangeStartPoint(startPoint) {
    console.log(this.state.currentBuilding.buildingName);
    console.log(this.state.currentFloor);

    await this.getPredictions(startPoint);
  }


  async getPredictions(startPoint) {
    console.log(startPoint);
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
              this.setState({
                startPoint: prediction.description,
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

    /**
     *
     * @param {*} startPoint
     * Controller function for searchBar component
     * manages contextual text entry
     */
    const onChangeText = (startPoint) => {
      return this.onChangeStartPoint(startPoint);
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
              this.setState({ showPredictions: false });
            }}
            lightTheme
            containerStyle={containerStyle}
            searchIcon={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={this.state.startPoint}
            style={styles.searchBar}
            blurOnSubmit
          />
        </View>
        {this.state.showPredictions ? predictions : null}
      </View>
    );
  }
}
