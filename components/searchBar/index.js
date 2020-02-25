import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Image style={styles.burger} source={require('./burger.png')} />
          <Text style={styles.searchBarText}>Search for a place</Text>
        </View>
      </View>
    );
  }
}
