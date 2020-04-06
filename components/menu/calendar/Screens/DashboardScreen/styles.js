import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#EEB462',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  touchable: {
    alignItems: 'center',
    backgroundColor: 'rgba(156,211,215,0.95)',
    width: '50%',
    height: '270%',
    bottom: 45,
    justifyContent: 'center',
  }
});

export default styles;
