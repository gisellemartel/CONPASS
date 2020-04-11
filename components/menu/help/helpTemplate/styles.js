import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

container: {
  width: '100%',
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#F5FCFF',
  margin:10,
  overflow:'hidden',
  paddingTop: 45
},
topicElement: {
  width: '100%',
  flexDirection: 'row',
  fontWeight:'bold',
  marginLeft: 20,
//  backgroundColor: '#C0C0C0' //Grey
},
topicText: {
  padding     : 20,
  paddingTop  : 10,
//backgroundColor: '#FFFF99' //Yellow
},
arrowStyle: {
  width : 35,
  height : 25,
  left: 140,
  //backgroundColor: '#90ee90' //Green
  },
TextStyle: {
  fontSize: 20,
  textDecorationLine: 'underline',
  },
});

export default styles;