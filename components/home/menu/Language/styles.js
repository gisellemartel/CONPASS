import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    position: 'absolute',
    top: 20,
    color: '#808080',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30
  },
  dropdown: {
    position: 'absolute',
    width: 300
  }
});

export default styles;
