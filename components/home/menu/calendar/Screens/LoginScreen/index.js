import React, { Component } from 'react';
import { View, Image, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

export default class LoginScreen extends Component {
   onSignIn = (googleUser) => {
     console.log('Google Auth Response', googleUser);
     // We need to register an Observer on Firebase Auth to make sure auth is initialized.
     const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
       unsubscribe();
       // Check if we are already signed-in Firebase with the correct user.
       if (!this.isUserEqual(googleUser, firebaseUser)) {
       // Build Firebase credential with the Google ID token.
         const credential = firebase.auth.GoogleAuthProvider.credential(
           googleUser.idToken,
           googleUser.accessToken
         );
         console.log("credential is "+ credential.accessToken);
         // Sign in with credential from the Google user.
         firebase
           .auth()
           .signInWithCredential(credential).then(() => {
             console.log('user sign in');
           })
           .catch((error) => {
           // Handle Errors here.
             const errorCode = error.code;
             const errorMessage = error.message;
             // The email of the user's account used.
             const email = error.email;
             // The firebase.auth.AuthCredential type that was used.
             const credential = error.credential;
           // ...
           });
       } else {
         console.log('User already signed-in Firebase.');
       }
     });
   }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (const i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID
          && providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '1074556967371-dq4p8r6ech6h3lobf9vvplm50276b5l7.apps.googleusercontent.com',
        iosClientId: '1074556967371-dlgnaho4p5t17fjh3p6g364qqq70bh15.apps.googleusercontent.com',
        client_secret: 'ftrx12z1pszC7qMCCgkqUXKC',
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        const accessToken = result.accessToken;
        const userInfoResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const jsonFile = await userInfoResponse.json();
        console.log("json file: ");
        console.log(jsonFile);
        this.props.navigation.navigate('DashboardScreen', { jsonFile });
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { this.signInWithGoogleAsync(); }}
        >
        <View>
            <Image
             style={styles.logo}
              source={require('./button.png')}
            />
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}
