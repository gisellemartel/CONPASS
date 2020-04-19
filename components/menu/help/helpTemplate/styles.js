import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#F5FCFF",
    margin: 10,
    overflow: "hidden",
  },
  topicElement: {
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "10%",
    backgroundColor: "#F5FCFF", //backgroundColor: "#a50da1", //Purple
  },
  arrowStyle: {
    width: 35,
    height: 25,
  },
  TextStyle: {
    flex: 1,
    fontSize: 20,
    textDecorationLine: "underline",
  },
});

export default styles;
