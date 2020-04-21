import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    height: 200,
    width: '100%',
    position: 'absolute',
    zIndex: 200
  },
  imageContainer: {
    position: 'absolute',
    right: 10,
    bottom: 100

  },
  textContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  location: {
    width: 50,
    resizeMode: 'contain'
  }
});

export default styles;
