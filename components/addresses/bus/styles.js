import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  busInfo: {
    backgroundColor: '#ffffff',
    margin: 30,
    padding: 40,
    borderRadius: 10
  },
  modalBackground: {
    backgroundColor: '#000000aa',
    flex: 1
  },

  container: {
    top: 146,
    left: 115,
    position: 'absolute',
    zIndex: 2,
  },
  currentLocation: {
    width: 15,
    resizeMode: 'contain',
  }

});

export default styles;
