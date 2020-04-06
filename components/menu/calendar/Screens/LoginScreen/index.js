import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, AsyncStorage
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import styles from './styles';


export default class LoginScreen extends Component {
   onSignIn = (googleUser) => {
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
         // Sign in with credential from the Google user.
         firebase
           .auth()
           .signInWithCredential(credential).then(() => {
           })
           .catch((error) => {
             alert(error);
           // ...
           });
       }
     });
   }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = providerData;
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
        const { accessToken } = result;
        AsyncStorage.setItem('accessToken', accessToken);
        const userInfoResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const jsonFile = await userInfoResponse.json();
        const stringFile = JSON.stringify(jsonFile);
        AsyncStorage.setItem('events', stringFile);
        this.props.navigation.navigate('FetchScreen');
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
