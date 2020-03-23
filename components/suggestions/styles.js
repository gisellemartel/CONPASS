import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    bottom: -9,
    width: '90%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    margin: 0,
    height: 270,
    position: 'absolute',
    borderWidth: 1
  },
  carousel: {
    marginBottom: 15,
    borderRadius: 5,
    right: 1,
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
    borderRadius: 24,
    bottom: 15,
    position: 'absolute',
  },
  information: {
    bottom: -95,
    left: -10,
  },
  image: {
    height: 120,
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
    color: 'white'
  }
});

export default styles;
