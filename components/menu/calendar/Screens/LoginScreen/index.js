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

        //getting an array of available calendars for the users. This includes calendar id and summer (i.e. name).
        const userCalendarsInfo = await this.getUserCalendars(accessToken);

        let calendarCount = 1;
        userCalendarsInfo.map(async (calendar) => {
          const userInfoResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const jsonFile = await userInfoResponse.json();
          /* if(calendarCount == 2)
            console.log('First calendar: ',jsonFile);*/
          const stringFile = JSON.stringify(jsonFile);
          AsyncStorage.setItem(`events${calendarCount}`, stringFile);
          calendar.storageId = `events${calendarCount}`;
          calendarCount += 1;
        });
        //console.log('last Check inshala: ',userCalendarsInfo);
        console.log('here i am!!!!!');
        await this.removeOldStoredEvents();

        this.props.navigation.navigate('FetchScreen', {userCalendarsInfo});
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  removeOldStoredEvents=async()=>{
    const finalStored = await AsyncStorage.getItem('events'); 
    if(finalStored!=null){
      console.log('The storage is null, indeed!');
      AsyncStorage.removeItem('events');
      return true;
    }else{
      return false;
    }
  }
  getUserCalendars = async (accessToken) => {
    const userCalendars = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?key=AIzaSyBAHObp5Ic3CbJpkX2500tNhf53e_3wBMA&timeMin=2020-01-01T01:00:00.000Z', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonFile = await userCalendars.json();
    let userCalendarsGeneralInfo = [];
    jsonFile.items.forEach( (calendar) => {
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
