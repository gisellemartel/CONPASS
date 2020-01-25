import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


export default function Slider() {

const [state,setState]=useState(false)

const [slides,setSlides] =useState([
  {
    key: '1',
    title: 'ConPass',
    text: 'Featuring SGW and Loyola maps',
    backgroundColor: '#59b2ab',
  },
  {
    key: '3',
    title: 'Indoor Maps',
    text: 'Get detailed indoor directions for all concordia buildings',
    //image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: '2',
    title: 'Personalized \n Schedule Notifications',
    text: 'Integrate your google \n calender to receive on class notifications',
    //image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },

])

const onDone = () => {
  setState(true)
};
const onSkip = () => {
  setState(true)
};

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 100
      }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

if(state){
  return (
  <View style={styles.mapscomp}>
    <Text>
      This will be your screen when you click Skip from any slide or Done
      button at last
    </Text>
  </View>
  );
} else {
  //Intro slides
  return (
    <AppIntroSlider
      slides={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 100
    },
    image: {
      width: 200,
      height: 200,
    },
    text: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      paddingVertical: 30,
    },
    title: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      marginBottom: 16,
      paddingBottom: 220
    },
    mapscomp: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 50,
    }
  });
  