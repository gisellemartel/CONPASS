import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
  },
  options: {
    position: 'absolute',
    top: '30%',
  },
  help: {
    position: 'absolute',
    bottom: 20
  }
});

export default styles;
