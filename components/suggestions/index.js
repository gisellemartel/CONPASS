import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import CloseButton from './closeButton';

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
      if (item.opening) {
        return (
          <View style={styles.slide}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.information}>
              <Text style={styles.name}>{ item.name }</Text>
              <Text style={styles.name}>{`Open Hours: ${item.opening[0]}-${item.opening[1]}`}</Text>
            </View>
          </View>
        );
      }
      return (
        <Image style={styles.buildingImage} source={item.image} />
      );
    };


    render() {
      const contentTemp = this.props.suggestion.placesToGo ? this.props.suggestion.placesToGo : this.props.suggestion.image;
      const content = contentTemp ? contentTemp : [];
      console.log("content " + content);
      return (
        <View style={styles.container}>
          <CloseButton changeSuggestionVisibility={this.props.changeSuggestionVisibility} style={styles.button} />
          <View style={styles.accessiblity}>
            <Icon accessiblity={this.props.suggestion.accessiblity} />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.buildingName}>
              {this.buildingName()}
              (
              {this.props.suggestion.building}
              )
            </Text>
            <Text style={styles.tunnelAccessiblity}>{this.tunnelAccessiblity()}</Text>
            <Text style={styles.address}>{this.address()}</Text>
          </View>
          <Carousel
            data={content}
            extraData={content}
            renderItem={this._renderItem}
            keyExtractor={(item) => { return item.id; }}
            horizontal
            itemWidth={300}
            sliderWidth={373}
            containerCustomStyle={styles.carousel}
          />
        </View>

      );
    }
}
const Icon = (props) => {
  if (props.accessiblity === true) {
    return <FontAwesome name="wheelchair-alt" size={22} color="orange" />;
  }
  return null;
};
export default Suggestions;
