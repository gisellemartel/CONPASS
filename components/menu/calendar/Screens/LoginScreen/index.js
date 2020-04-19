/* istanbul ignore file */
import React, { Component } from 'react';
import {
  View, Image, TouchableOpacity, AsyncStorage, Text
} from 'react-native';
import i18n from 'i18n-js';
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
           });
       }
     });
   }

   /**
    * This function returns a boolean to check
    * if already signed-in Firebase with the correct user.
    * @param {String} googleUser - Google user identifier.
    * @param {String} firebaseUser - Firebase user identifier.
    */
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = providerData;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID
          && providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  /**
 * This function authorizes the application to access user's calendars.
 * Also, it retrieves all users' calendars and saves it locally.
 */
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

        // getting an array of available calendars for the users.
        // This includes calendar id and summer (i.e. name).
        const userCalendarsInfo = await this.getUserCalendars(accessToken);

        let calendarCount = 1;
        userCalendarsInfo.map(async (calendar) => {
          const userInfoResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const jsonFile = await userInfoResponse.json();
          const stringFile = JSON.stringify(jsonFile);
          AsyncStorage.setItem(`events${calendarCount}`, stringFile);
          // eslint-disable-next-line no-param-reassign
          calendar.storageId = `events${calendarCount}`;
          calendarCount += 1;
        });
        await this.removeOldStoredEvents();

        this.props.navigation.navigate('FetchScreen', { userCalendarsInfo });
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  /**
   * This function removes old stored events from the local storage.
   */
  removeOldStoredEvents=async () => {
    const finalStored = await AsyncStorage.getItem('events');
    if (finalStored != null) {
      AsyncStorage.removeItem('events');
      return true;
    }
    return false;
  }

  /**
 * The function fetches and returns general users' calendars
 * @param {String} accessToken - User Access Token.
 */
  getUserCalendars = async (accessToken) => {
    const userCalendars = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonFile = await userCalendars.json();
    const userCalendarsGeneralInfo = [];
    jsonFile.items.forEach((calendar) => {
      userCalendarsGeneralInfo.push({
        id: calendar.id,
        summary: calendar.summary,
        backgroundColor: calendar.backgroundColor,
        storageId: '',
      });
    });
    return userCalendarsGeneralInfo;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { this.signInWithGoogleAsync(); }}
        >
          <View style={{ padding: 10, backgroundColor: '#4285f5', borderRadius: 20 }}>
            <Text style={{ color: '#ffffff' }}>{i18n.t('signIn')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
