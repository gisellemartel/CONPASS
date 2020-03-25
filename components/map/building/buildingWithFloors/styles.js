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
  buildingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 300
  },
  descriptor: {
    position: 'absolute',
    top: 0,
    width: fullWidth,
    height: 100,
    backgroundColor: 'white',
    zIndex: 305,
  },
  quitButton: {
    left: 0,
    top: 250,
    flex: 1,
    height: 20,
    fontSize: 20
  },
  switcher: {
    display: 'flex',
    flexDirection: 'row',
    left: 0,
    bottom: 10,
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
