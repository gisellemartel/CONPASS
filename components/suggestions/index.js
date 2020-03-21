import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

class Suggestions extends Component {

      buildingName = () => {
        return (`${this.props.suggestion.buildingName} `);
      }

      tunnelAccessiblity = () => {
        if (this.props.suggestion.tunnelAccessiblity === true) {
          return ('Tunnel is accessible');
        }
        return ('Tunnel is not accessible');
      }

      address = () => {
        return (`Address: ${this.props.suggestion.address}`);
      }

      passDirections = (id) => {
        this.props.getDirections(id);
      }

    _renderItem = ({ item }) => {
      return (
        <View style={styles.slide}>
          <Image style={styles.image} source={item.image} />
          <View style={styles.information}>
            <Text style={styles.name}>{ item.name }</Text>
            <Text style={styles.name}>{'Open Hours: '+ item.opening[0] +'-'+ item.opening[1]}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.passDirections(item.placeId)}>
              <Text style={styles.button}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    passDestination = ({ destination }) => {
      // this.props.getDestination(destination);
      console.log("hellloo");
    }

    render() {
      const content = this.props.suggestion.placesToGo ? this.props.suggestion.placesToGo : [];
      return (
        <View style={styles.container}>
          <Text style={styles.buildingName}>
            {this.buildingName()}
            (
            {this.props.suggestion.building}
            )
          </Text>
          <Text style={styles.tunnelAccessiblity}>{this.tunnelAccessiblity()}</Text>
          <Text style={styles.address}>{this.address()}</Text>
          <Carousel
            data={content}
            extraData={content}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
            horizontal
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            containerCustomStyle={styles.carousel}
          />
        </View>

      );
    }
}
export default Suggestions;
