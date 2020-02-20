import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import styles from './styles';

export default function TheMap() {
    return (    
        <View style={styles.container}>
            <MapView initialRegion={{
                latitude: 45.492409,
                longitude: -73.582153,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }} style={styles.mapStyle} />
        </View>
    );
}
