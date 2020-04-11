import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

container: {
  width: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#F5FCFF'
},
pageHeader: {
  flex: 1,
  width: '100%',
  fontWeight: 'bold',
  top: 60,
  marginLeft: 20,
},
topicElement: {
  flex: 1,
  width: '100%',
  flexDirection: 'row',
  padding : 10,
  fontWeight:'bold',
  marginLeft: 20,
  bottom: 50,
  backgroundColor: '#F5FCFF'
},
arrowStyle: {
  width : 35,
  height : 25,
  left: 140,
  },
TextStyle: {
  fontSize: 20,
  textDecorationLine: 'underline',
  }
});

export default styles;