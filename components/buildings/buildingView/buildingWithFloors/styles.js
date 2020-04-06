import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buildingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 0,
    right: 0,
    top: fullHeight * 0.15,
    bottom: fullHeight * 0.20,
    width: fullWidth * 0.85,
    height: fullWidth * 0.85,
    zIndex: 300
  },
  switcher: {
    position: 'absolute',
    flexDirection: 'row',
    top: fullHeight * 0.1,
    backgroundColor: 'white',
    bottom: 125,
    zIndex: 300,
  },
  lvl: {
    marginBottom: 175,
    padding: 10,
    backgroundColor: '#FFE8D2',
    borderColor: '#9CD3D7',
    borderWidth: 3,
    borderStyle: 'solid'
  }
});

export default styles;
