import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TheMap from '../map';
import SearchBar from '../searchBar';
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 45.492409,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
    };
  }

  updateRegion = (newRegion) => {
    this.setState({
      region: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  }

  render() {
    const {language} = this.props;
    return (
      <View style={styles.container}>
        <TheMap updatedRegion={this.state.region} />
        <Text style={styles.button} onPress={() => { return this.props.navigation.navigate('Menu'); }}>press me {language}</Text>
        <SearchBar callBack={this.updateRegion} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.language };
};

export default connect(mapStateToProps)(Home);
