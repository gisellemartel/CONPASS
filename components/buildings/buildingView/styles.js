import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').heigth;

const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    justifyContent: 'center',
    height: fullHeight,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute'
  },
  descriptor: {
    position: 'relative',
    top: 0,
    flexDirection: 'row',
    width: fullWidth,
    height: 75,
    backgroundColor: 'white',
    zIndex: 305,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buildingLogoContainer: {
    left: 0,
    position: 'relative',
    top: 0
  },
  buildingLogo: {
    width: 40,
    resizeMode: 'contain',
  },
  buildingName: {
    fontSize: 20,
  },
  quitInterior: {
    right: 0,
    position: 'relative',
  },
  quitButton: {
    width: 25,
    resizeMode: 'contain',
  },
  indoorView: {
    position: 'relative',
    maxWidth: 350,
    minWidth: 275
  }
});

export default styles;
