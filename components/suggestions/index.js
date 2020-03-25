import React, { Component } from 'react';
import {
  View, Text, Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import CloseButton from './closeButton';

class Suggestions extends Component {
    renderItem = ({ item }) => {
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
      const contentTemp = this.props.suggestion.placesToGo || this.props.suggestion.image;
      const content = contentTemp || [];
      const tunnelAccessiblity = this.props.suggestion.tunnelAccessiblity ? 'Tunnel is accessible' : 'Tunnel is not accessible';

      return (
        <View style={styles.container}>
          <CloseButton
            changeSuggestionVisibility={this.props.changeSuggestionVisibility}
            style={styles.button}
          />
          <View style={styles.accessiblity}>
            <Icon accessiblity={this.props.suggestion.accessiblity} />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.buildingName}>
              {this.props.suggestion.buildingName}
              (
              {this.props.suggestion.building}
              )
            </Text>
            <Text style={styles.tunnelAccessiblity}>{tunnelAccessiblity}</Text>
            <Text style={styles.address}>{this.props.suggestion.address}</Text>
          </View>
          <Carousel
            data={content}
            extraData={content}
            renderItem={this.renderItem}
            keyExtractor={(item) => { return `${item.name}-${item.id}-${item.placeID}`; }}
            horizontal
            itemWidth={300}
            sliderWidth={375}
            window
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
