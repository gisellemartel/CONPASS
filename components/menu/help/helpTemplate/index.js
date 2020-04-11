import React, { Component } from 'react';
import {
View, Text, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager
} from 'react-native';
import styles from './styles';
import arrow from '../../../../assets/icons/downarrow.png'

const titles = ['Guide to CONPASS', 'Accessibility'];

export default class HelpTemplate extends Component{
constructor (props) {
    super(props);
    this.state = {
        expanded: false,
        title: props.title,
    }
}

changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }

render() {
    return (
    <View style= {styles.container}>
        <View style = {styles.topicElement}>
            <Text style = {styles.TextStyle}> {this.state.title} </Text>
            <TouchableOpacity onPress={this.changeLayout}>
            <Image style={styles.arrowStyle} source={arrow} />
            </TouchableOpacity>
         </View>
         <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' ,padding: 20,
  paddingTop: 10 }}>
            {this.props.children}
         </View>
    </View >
);
}
}

