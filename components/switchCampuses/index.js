import React, { Component } from 'react';
import {
    View, Keyboard, TouchableOpacity, Text, StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

export default class SwitchCampuses extends Component {
    constructor(props) {
        super(props);
    }

    async getLatLong(prediction) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ description: prediction });
        const key = 'AIzaSyCqNODizSqMIWbKbO8Iq3VWdBcK846n_3w';
        const geoUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${prediction}`;

        try {
            const georesult = await fetch(geoUrl);
            const gjson = await georesult.json();
            this.setState({ locations: gjson.result.geometry.location });

            this.setState({
                region: {
                    // eslint-disable-next-line react/no-access-state-in-setstate
                    latitude: this.state.locations.lat,
                    // eslint-disable-next-line react/no-access-state-in-setstate
                    longitude: this.state.locations.lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }

            });
            this.props.callBack(this.state.region);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btn}>
                    <Button title='Loyola'
                        onPress={() => this.getLatLong('ChIJJ4gBMS4XyUwR5Cxm6Yq7mhc')}
                    />

                </View>

                <View style={styles.btn}>
                    <Button title='SGW'
                        onPress={() => this.getLatLong('ChIJCT3qZGoayUwRmPk37VHZSRY')}
                    />
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