import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import styles from "./styles";
import arrow from "../../../../assets/icons/downarrow.png";

export default class HelpTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      title: props.title,
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  /**
   * @function updates the Layout to either expand or collapse
   * ConfigureNext schedules new animation changes to happen on next layout render
   * easeInEaseOut are predefined configurations for animated elements
   */
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topicElement}>
          <Text style={styles.TextStyle}>{this.state.title} </Text>
          <TouchableOpacity onPress={this.changeLayout}>
            <Image style={styles.arrowStyle} source={arrow} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: this.state.expanded ? null : 0,
            overflow: "hidden",
            flexDirection: "column",
            padding: 5,
            marginLeft: 15,
            paddingTop: 10,
            marginRight: 18,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
          }}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}
