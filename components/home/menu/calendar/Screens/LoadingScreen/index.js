import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import styles from './styles';


export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }


  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('FetchScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
