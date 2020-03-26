import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {

  signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      androidClientId: '1074556967371-dq4p8r6ech6h3lobf9vvplm50276b5l7.apps.googleusercontent.com',
      iosClientId: '1074556967371-dlgnaho4p5t17fjh3p6g364qqq70bh15.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In with Google"
          onPress={() => { this.signInWithGoogleAsync(); }}
        />
      </View>
    );
  }
}
