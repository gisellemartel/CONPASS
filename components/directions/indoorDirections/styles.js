import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

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
    zIndex: 300,
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
    bottom: 50,
    width: '100%',
    height: '100%'
  },
  iconsContainer: {
    top: 35,
  },
  directionsContainer: {
    zIndex: 500,
    top: 25,
    width: '100%',
    height: '100%'
  },
  directionsContainerBackground: {
    backgroundColor: 'rgba(156,211,215,0.8)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 165,
    top: 25,
    position: 'absolute',
    zIndex: -1,
    width: '99%',
    left: '0.5%'
  },
  searchContainer: {
    alignItems: 'center',
    width: '87%',
    left: 45,
    position: 'relative',
    top: 35
  },
  buildingInfoModalContainer: {
    top: 500,
    position: 'absolute'
  },
  modalBackground: {
    width: fullWidth,
    height: fullHeight,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    opacity: 0.9,
  },
  buildingInfoButtonContainer: {
    bottom: 135,
    right: 10,
    position: 'absolute',
    zIndex: 200
  },
  buildingInfoButton: {
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white'
  }
});

export default styles;
