import { StyleSheet } from "react-native";
import colors from "app/globalStyles/colors.styles.js"; //import not working

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    top: 25,
    width: "95%",
    height: 40,
    borderRadius: 10
  },
  Bar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  burger: {
    resizeMode: "contain",
    width: 25,
    height: 250,
    margin: 10
  },

  suggestions: {
    backgroundColor:"white",
    padding:5,
    borderWidth:0.5,
     marginLeft:5,
    marginRight: 5
  },
  searchBar: {
    color: "white",
    borderWidth:0.5,
    width:"95%",
    marginLeft:5,
    marginRight: 5
  }
});

export default styles;