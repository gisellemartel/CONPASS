import React, { Component } from 'react';
import {
View, Text, Image, TouchableOpacity, Animated
} from 'react-native';
import HelpInformation from './helpInformation'
import styles from './styles';
import arrow from '../../../assets/icons/downarrow.png'

const titles = ['Guide to CONPASS', 'Accessibility'];
export default class Help extends Component{
constructor () {
    super();
    this.state = {
        toggle: true
    }
}


render() {
    return (
    <View style={styles.container}>
        <View style = {styles.pageHeader} >
            <Text style = {{fontSize: 35}} > Topics </Text>
        </View>
        <View style = {styles.topicElement}>
            <Text style = {styles.TextStyle}> Guide to CONPASS </Text>
            <TouchableOpacity>
            <Image style={styles.arrowStyle} source={arrow} />
            </TouchableOpacity>
        </View>
        <View style = {styles.topicElement}>
            {/* Temp styling fix */ }
            <Text style = {styles.TextStyle}> Accessibility {"            "} </Text>
            <TouchableOpacity >
            <Image style={styles.arrowStyle} source={arrow} />
            </TouchableOpacity>
        </View>
        <View style={styles.body}>
            {this.props.children}
         </View>
    </View>
);
}
}