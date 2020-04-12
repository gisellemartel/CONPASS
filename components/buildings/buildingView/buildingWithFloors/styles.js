import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  buildingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: fullHeight * 0.20,
    width: fullWidth * 0.85,
    height: fullWidth * 0.85,
    zIndex: 300
  },
  switcher: {
    flexDirection: 'row',
    alignItems: 'center',
    top: fullHeight * 0.1,
    backgroundColor: 'white',
    bottom: 125,
    height: 120,
    zIndex: 1100,
    marginRight: 50,
  },
  textContainer: {
    height: '100%',
  },
  lvl: {
    padding: 10,
    backgroundColor: '#FFE8D2',
    borderColor: '#9CD3D7',
    borderWidth: 3,
    borderStyle: 'solid',
    zIndex: 1200,
  }
});

export default styles;
