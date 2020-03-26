import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  busInfo: {
    backgroundColor: '#ffffff',
    margin: 30,
    padding: 40,
    borderRadius: 10,
    zIndex: 201,
  },
  modalBackground: {
    backgroundColor: '#000000aa',
    flex: 1,
    zIndex: 201,
  },

  container: {
    top: 130,
    left: 105,
    position: 'absolute',
    zIndex: 201,
  },
  currentLocation: {
    width: 15,
    resizeMode: 'contain',
  }

});

export default styles;
