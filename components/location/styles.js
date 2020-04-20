import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  touch: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#9CD3D7'
  },
  container: {
    bottom: 100,
    right: 10,
    position: 'absolute',
    zIndex: 200
  },
  location: {
    width: 50,
    resizeMode: 'contain'
  },
  userFinalLoc: {
    bottom: 80,
    backgroundColor: 'pink',
    position: 'absolute'
  }
});

export default styles;
