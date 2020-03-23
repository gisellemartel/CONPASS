import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    bottom: -1,
    width: '97%',
    borderRadius: 20,
    margin: 10,
    height: 280,
    position: 'absolute',
    borderWidth: 5
  },
  carousel: {
    marginBottom: 15,
    borderRadius: 30,
  },
  accessiblity: {
    position: 'absolute',
    right: 70,
    top: 3
  },
  slide: {
    backgroundColor: '#9CD3D7',
    height: 175,
    width: 300,
    padding: 26,
    borderRadius: 24,
    bottom: 0,
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
  buildingName: {
    left: 20,
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tunnelAccessiblity: {
    left: 20,
    padding: 2
  },
  address: {
    left: 20,
    padding: 2
  },
  buttonContainer: {
    height: 180,
  },
  name: {
    color: 'white'
  }
});

export default styles;
