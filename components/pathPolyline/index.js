import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './styles';
import directions from '../../assets/icons/directions.png';
import { resetNavigation } from '../../store/actions';

class PathPolyline extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.changeVisibilityTo(true); this.props.resetNavigation(); }}>
          <Image style={styles.directions} source={directions} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetNavigation: () => { dispatch(resetNavigation()); },
  };
};

export default connect(null, mapDispatchToProps)(PathPolyline);
