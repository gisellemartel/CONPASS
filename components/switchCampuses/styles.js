import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonLeft: {
    width: '45%',
    height: 40,
    bottom: '92%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    margin: 1,
    opacity: 0.75,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonRight: {
    width: '45%',
    height: 40,
    bottom: '92%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    margin: 1,
    opacity: 0.75,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",

  },
  buttonPressedLeft: {
    width: '45%',
    height: 40,
    bottom: '92%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    overflow: "hidden",
    opacity: 0.9,
    borderRadius: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonPressedRight: {
    width: '45%',
    height: 40,
    bottom: '92%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    overflow: "hidden",
    opacity: 0.9,
    borderRadius: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#ffffff',
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
