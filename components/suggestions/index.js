import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
            content: [
        { image: require('./starbucks.jpg'), name: 'starbucks' },
        { image: require('./timeHortons.jpg'), name: 'tim hortons' },
        { image: require('./hallCafe.jpg'), name: 'hall cafe' }
      ]
    };
  }


    render() {
      return ( 

      );
  }
}
export default Suggestions;