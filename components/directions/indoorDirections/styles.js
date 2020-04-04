import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: fullHeight,
    alignContent: 'center',
    zIndex: 300
  },
  directionsContainer: {
    backgroundColor: 'rgba(156,211,215,0.8)',
    width: fullWidth * 0.84,
    left: fullWidth * 0.08,
    right: fullWidth * 0.08,
    bottom: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 165,
    position: 'absolute',
    zIndex: 301
  },
  searchContainer: {
    alignItems: 'center',
    width: '87%',
    left: 45,
    position: 'absolute',
    top: 0
  }
});

export default styles;
