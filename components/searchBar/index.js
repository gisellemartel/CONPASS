import React, { Component } from "react";
import { View, TextInput, Text, Image } from "react-native";
import styles from "./styles";
import { SearchBar } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      predictions: []
    };
  }
  async onChangeDestination(destination) {
    this.setState({ destination });
    const key = "AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w";
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${destination}&location=45.492409, -73.582153&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      console.log(json);
      this.setState({
        predictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const predictiions = this.state.predictions.map(prediction => (
      <Text

        style={styles.suggestions}
        key={prediction.id}
      >
        {prediction.description}
      </Text>
    ));
    return (
      <View style={styles.container}>
        <View>
          {/* <Image style={styles.burger} source={require("./burger.png")} /> */}

          <SearchBar
          lightTheme
            placeholder="Type Here..."
            onChangeText={destination => this.onChangeDestination(destination)}
            value={this.state.destination}
            style={styles.SearchBar}
          />
        </View>

        {predictiions}
      </View>
    );
  }
}
