import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute'
  },

  buildingContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },

  quitButton: {
    left: 0,
    top: 100,
    flex: 1,
    height: 20
  },
  switcher: {
    display: 'flex',
    flexDirection: 'row',
    left: 0,
    bottom: 100,
  },
  lvl: {
    padding: 10,
    backgroundColor: 'cyan',
    zIndex:7,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid'
  }
});

export default styles;
