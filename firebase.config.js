import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCUmnT65jY4RUXsjME0EcK2i0qIHwUKP2w',
  authDomain: 'conpass-ea7c3.firebaseapp.com',
  databaseURL: 'https://conpass-ea7c3.firebaseio.com',
  projectId: 'conpass-ea7c3',
  storageBucket: 'conpass-ea7c3.appspot.com',
  messagingSenderId: '1074556967371',
  appId: '1:1074556967371:web:8158feba19ab92acbf7e4e',
  measurementId: 'G-S0K3T11EEN'
};
firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
