import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
    zIndex: 300
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
  buildingViewContainer: {
    alignItems: 'center',
    position: 'relative',
    bottom: 50
  },
  directionsContainer: {
    backgroundColor: 'rgba(156,211,215,0.8)',
    width: fullWidth * 0.84,
    left: fullWidth * 0.08,
    right: fullWidth * 0.08,
    bottom: 50,
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
