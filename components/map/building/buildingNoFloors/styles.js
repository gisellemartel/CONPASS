import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    flex: 1,
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute'
  },
  quitButton: {
    left: 0,
    marginTop: 225,
    top: 250,
    flex: 1,
    height: 20,
    fontSize: 20,
  },
  directionsButton: {
    left: 0,
    bottom: 0,
    marginBottom: 225,
    height: 20,
    fontSize: 20,
  },
});

export default styles;
