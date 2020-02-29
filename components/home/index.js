import React, { Component } from 'react';
import { View } from 'react-native';
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
    return (
      <View style={styles.container}>
        <TheMap updatedRegion={this.state.region} />
        <SearchBar callBack={this.updateRegion} navigation={this.props.navigation} />
      </View>
    );
  }
}

/**
 * Redux store listener. This function will update
 * the connected component state whenever the store updates.
 */
const mapStateToProps = (state) => {
  return { language: state.language };
};

export default connect(mapStateToProps)(Home);
