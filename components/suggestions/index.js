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
      refresh: true,
    };
  }


  // componentDidMount() {
  //   console.log( "I am here1");
  //   this.setState({
  //     content: this.props.placesToGo,
  //     refresh:!this.state.refresh
  //   });
  //   console.log("I am here2 "+this.state.content);

  // }

  // componentWillReceiveProps(nextProps) {
  // // You don't have to do this check first, but it can help prevent an unneeded render
  //   this.setState({
  //     refresh: !this.state.refresh
  //   });
  // }

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
          <Text style={styles.buildingName}>
            {this.buildingName()}
            (
            {this.props.suggestion.building}
            )
          </Text>
          <Text style={styles.tunnelAccessiblity}>{this.tunnelAccessiblity()}</Text>
          <Text style={styles.address}>{this.address()}</Text>
          {/* <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.content}
            containerCustomStyle={styles.carousel}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            loop={true}
            autoplay={true}
            autoplayDelay={0}
            enableMomentum={true}
            lockScrollWhileSnapping={false}
            autoplayInterval={
                this.handleTimeReturn()
            }
          /> */}

          <FlatList
            horizontal
            // data={content}
            extraData={!this.state.refresh}
            renderItem={this._renderItem}
          />
        </View>

      );
    }
}
export default Suggestions;
