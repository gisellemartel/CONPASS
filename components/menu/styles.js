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
    top: 0,
    left: 10,
    resizeMode: 'contain',
    position: 'absolute',
  },
  options: {
    position: 'absolute',
    top: '20%',
    left: 0,
    paddingLeft: 20,
  },
  option: {
    paddingBottom: 20,
    textAlign: 'left',
    fontSize: 30,
  },
  help: {
    position: 'absolute',
    top: '100%',
    left: 0,
    paddingLeft: 20,
    fontSize: 30,
  }
});

export default styles;
