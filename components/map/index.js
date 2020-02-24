import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import styles from './styles';

export default function TheMap() {
    return (    
        <View style={styles.container}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: 45.492409,
                longitude: -73.582153,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }} style={styles.mapStyle} />
        </View>
    );
}
