import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import SearchBar from '../searchBar';
import styles from './styles';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TheMap />
        <SearchBar />
      </View>
    );
  }
}
