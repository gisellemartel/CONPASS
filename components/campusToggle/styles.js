import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    top: 75,
    width: '100%'
  },
  buttonLeft: {
    position: 'relative',
    width: '50%',
    height: 50,
    // bottom: '70%',
    borderRadius: 10,
    margin: 1,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonRight: {
    position: 'relative',
    width: '50%',
    height: 50,
    // bottom: '70%',
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    opacity: 0.9,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPressedLeft: {
    position: 'relative',
    width: '50%',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    opacity: 0.9,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPressedRight: {
    position: 'relative',
    width: '50%',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    opacity: 0.9,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#1a1a1a',
    fontWeight: '400',
    fontSize: 18,
    justifyContent: 'center'
  }
});

export default styles;
