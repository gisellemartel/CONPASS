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
    backgroundColor: 'red',
    position: 'absolute',
  },
  button: {
    zIndex: 6,
  }
});

export default styles;
