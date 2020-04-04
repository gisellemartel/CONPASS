import { StyleSheet, Dimensions } from 'react-native';
const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    flex: 1,
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'grey',
    position: 'absolute'
  },
  descriptor: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    top: 0,
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
  buildingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 325,
    height: 325,
    zIndex: 300
  },
  switcher: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    bottom: -50,
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
