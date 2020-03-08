import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {

    position: 'absolute',
    top: 75,
    width: '95%',
  
  },
  view: {
    borderRadius: 15
  },
  Bar: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Touch: {
    color: '#AFB9C4',
    borderWidth: 1,
    padding: 10,
    margin: 1,
    borderRadius: 5,
  },
  burger: {
    resizeMode: 'contain',
    width: 25,
    height: 250,
    margin: 10
  },
  sug: {
    backgroundColor: '#F1F7FC',
    height: '100%',
  },
  suggestions: {
    color: 'black',
    padding: 5,
    width: '90%',
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  SearchBar: {
      margin: 20,
      height: 40,

      borderColor: '#9CD3D7',
      borderWidth: 1,
      borderRadius:10,
      borderWidth:2
  }
});

export default styles;