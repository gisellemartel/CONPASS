import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 25,
    width: '90%',
    zIndex: 300,
    borderRadius: 20
  },
  view: {
    borderRadius: 15,
    zIndex: 300
  },
  Touch: {
    color: '#AFB9C4',
    borderWidth: 1,
    padding: 10,
    margin: 1,
    borderRadius: 5,
  },
  burger: {
    width: 20,
    resizeMode: 'contain',
  }
});

export default styles;
