import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {

   onSignIn = (googleUser) => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

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
