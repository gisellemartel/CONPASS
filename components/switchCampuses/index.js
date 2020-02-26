import React, { Component } from 'react';
import {
    View, Keyboard, TouchableOpacity, Text, StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

export default class SwitchCampuses extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btn}>
                    <Button title='Layola' />
                </View>
                <View style={styles.btn}>
                    <Button title='SGW' />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    btn: {
        bottom: '97%',
        width: '30%',
        marginHorizontal: 5,
    }, container: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center'
    },
});