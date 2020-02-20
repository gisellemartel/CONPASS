import React, { Component } from 'react';
import {View, Text } from 'react-native';
import styles from './styles';
import TheMap from 'app/components/map';
import SearchBar from 'app/components/searchBar';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TheMap />
        <SearchBar/>
      </View>
    );
  }
}
