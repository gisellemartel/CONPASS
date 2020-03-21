import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions, FlatList
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: 0,
      content: [{
        name: 'LB Café', id: '4', placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns', opening: ['8:00', '9:30'], image: require('/Users/talalbazerbachi/Documents/GitHub/CONPASS/assets/polygons/images//LbCafe.jpeg')
      },
      {
        name: 'Starbucks', id: '5', placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns', opening: ['8:00', '9:30'], image: require('/Users/talalbazerbachi/Documents/GitHub/CONPASS/assets/polygons/images//starbucks.jpg')
      },
      {
        name: 'Tim Hortons', id: '6', placeID: 'ChIJaX1tY2oayUwRx9YEeFhP2ns', opening: ['8:00', '9:30'], image: require('/Users/talalbazerbachi/Documents/GitHub/CONPASS/assets/polygons/images//TimHortons.jpg')
      }
      ]
    };
  }


  componentDidUpdate(prevProps) {
    const kontent = this.props.suggestion.placesToGo;
    if (prevProps.suggestion.placesToGo !== kontent) {
      console.log("am here");
      this.updateRefresh();
    }
    console.log("in didUpdate " + this.state.refresh);
  }

  updateRefresh = () => {
    this.setState({
      refresh: this.state.refresh + 1
    });
    console.log("in refresh " + this.state.refresh);
  }

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
        // this.setState({
        //   refresh: !this.state.refresh
        // });
        return (`Address: ${this.props.suggestion.address}`);
      }

    _renderItem = ({ item }) => {
      console.log("**am in renderItem**");
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
      const content = this.props.suggestion.placesToGo ? this.props.suggestion.placesToGo:this.state.content;
      console.log("here " + content);
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
