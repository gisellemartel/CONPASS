import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '5%',
    marginStart: '5%'
  },
  flatListContainer: {
    marginTop: '5%',
    height: '70%',
    width: '80%',
    marginLeft: '10%'
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    borderRadius: 5
  },
  button: {
    position: 'relative',
    width: '50%',
    bottom: -10,
    left: '25%'
  }
});

export default styles;
