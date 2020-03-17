import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 75,
    width: '90%',
    zIndex: 3
  },
  view: {
    borderRadius: 15,
    zIndex: 3
  },
  Bar: {
    alignItems: 'center'
  },
  Touch: {
    color: '#AFB9C4',
    borderWidth: 1,
    padding: 10,
    margin: 1,
    zIndex: 30,
    borderRadius: 5,
  },
});

export default styles;
