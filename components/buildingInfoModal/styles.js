import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: fullHeight,
    position: 'absolute',
  },
  infoBox: {
    backgroundColor: 'white',
    bottom: fullHeight * 0.32,
    width: fullWidth * 0.92,
    left: fullWidth * 0.04,
    borderRadius: 10,
    margin: 0,
    height: fullHeight * 0.32,
    position: 'absolute',
    borderWidth: 1,
    zIndex: 300
  },
  carousel: {
    bottom: -10,
    marginBottom: 15,
    borderRadius: 5,
    left: 6,
    height: '100%',
  },
  accessiblity: {
    position: 'absolute',
    left: 20,
    top: 8
  },
  slide: {
    backgroundColor: '#9CD3D7',
    height: 175,
    width: 300,
    padding: 26,
    borderRadius: 10,
    bottom: 0,
    position: 'absolute',
  },
  information: {
    padding: 5,
    bottom: -105,
    left: -20,
    fontSize: 300,
  },
  image: {
    height: 130,
    width: 300,
    position: 'absolute',
    borderRadius: 10
  },
  buildingImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 10
  },
  buildingName: {
    left: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tunnelAccessiblity: {
    left: 20,
    paddingLeft: 10
  },
  address: {
    left: 20,
    padding: 10
  },
  name: {
    color: 'white',

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
  buttonContainer: {
    zIndex: 400,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    width: fullWidth,
    bottom: fullHeight * 0.22
  },
  button: {
    position: 'relative',
    width: '40%',
    height: 50,
    borderRadius: 10,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
  },
  textStyle: {
    color: '#1a1a1a',
    fontWeight: '400',
    fontSize: 18,
  }
});

export default styles;
