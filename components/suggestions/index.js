import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [{ name: 'talal', image: require('./timeHortons.jpg') }]
    };
  }

  ComponentDidMount=()=>{
    console.log("I am here1"+this.props.placesToGo.name);
    this.setState({
      content:this.props.placesToGo
    });
    console.log("I am here2"+this.state.content.name);

  }
  
    _renderItem = ({ item }) => {
      return (
        <View style={styles.slide}>
          <Image style={styles.image} source={item.image} />
          <View style={styles.information}>
            <Text style={styles.name}>{ item.name }</Text>
          </View>
        </View>
      );
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
            loop
            autoplay
            autoplayDelay={0}
            enableMomentum
            lockScrollWhileSnapping={false}
          />
        </View>

      );
    }
}
export default Suggestions;
