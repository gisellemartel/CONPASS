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
      <View style={styles.container}>
        <Text>Hall Building</Text>
        <Text>Open</Text>
        <Text>Tunnel Accessibility</Text>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.content}
          containerCustomStyle={styles.carousel}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
        />
      </View>

    );
  }
}
export default Suggestions;