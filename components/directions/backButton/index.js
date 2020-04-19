import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import styles from './styles';
import { resetNavigation } from '../../../store/actions';

class BackButton extends Component {
  back() {
    if (this.props.withRedux) {
      this.props.resetNavigation();
    }
    this.props.changeVisibilityTo(false);
    if (this.props.changePolylineVisibilityTo) {
      this.props.changePolylineVisibilityTo(false);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.back();
        }}
        >
          <Entypo name="chevron-left" size={32} color="black" />
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

export default connect(null, mapDispatchToProps)(BackButton);
