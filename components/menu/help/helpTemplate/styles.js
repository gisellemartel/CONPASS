import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
    margin:10,
    overflow:'hidden'
},
  topicElement: {
    flexDirection: 'row'
},
  topicText: {
    flex: 1,
},
  arrowStyle: {
    width : 35,
    height : 25,
  },
  TextStyle: {
    flex: 1,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});

export default styles;