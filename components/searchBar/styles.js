import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 25,
    width: '95%',
    height: 40,
    borderRadius: 10
  },
  Bar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    marginRight: 5
  },
  searchBar: {
    color: 'white',
    borderWidth: 0.5,
    width: '95%',
    marginLeft: 5,
    marginRight: 5
  }
});

export default styles;
