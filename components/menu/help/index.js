import React, { Component } from 'react';
import {
  View, Text, ScrollView, SectionList
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from './styles';

const titles = ['Guide to CONPASS', 'Accessibility'];
export default class Help extends Component{
    constructor () {
        super();
        this.state = {
            dropDownArrow: false
        }
    }

    render() {
    return (
        <View style={styles.container}>
        </View>
    );
    }
}