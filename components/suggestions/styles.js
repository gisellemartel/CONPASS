import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    bottom: 0,
    width: '95%',
    borderRadius: 10,
    margin: 0,
    height: 270,
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
    left: 3,
    top: 4
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
    bottom: -105,
    left: -10,
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
    padding: 0,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tunnelAccessiblity: {
    left: 20,
    padding: 0
  },
  address: {
    left: 20,
    padding: 0
  },
  buttonContainer: {
    height: 180,
  },
  name: {
    color: 'white',

  }
});

export default styles;
