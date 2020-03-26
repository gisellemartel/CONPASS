import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 75,
    width: '90%',
    zIndex: 280,
    borderRadius: 10
  },
  view: {
    borderRadius: 15,
    zIndex: 280,
  },
  Bar: {
    alignItems: 'center',
  },
  Touch: {
    color: '#AFB9C4',
    borderWidth: 1,
    padding: 10,
    margin: 1,
    zIndex: 201,
    borderRadius: 5,
  },
});

export default styles;
