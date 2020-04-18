import React, { Component } from 'react';
import {
  View, Text, Image, Modal, TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

class BuildingInfoModal extends Component {
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
      const contentTemp = this.props.buildingInfoData.placesToGo || this.props.buildingInfoData.image;
      const content = contentTemp || [];
      const tunnelAccessiblity = this.props.buildingInfoData.tunnelAccessiblity
        ? 'Tunnel is accessible' : 'Tunnel is not accessible';
      return (
        <Modal
          visible={this.props.showBuildingInfoModal}
          transparent
          fade="fade"
        >
          <View style={styles.modalBackground} />
          <View style={styles.container}>

            <View style={styles.infoBox}>
              <View style={styles.accessiblity}>
                <Icon accessiblity={this.props.buildingInfoData.accessiblity} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.buildingName}>
                  {this.props.buildingInfoData.buildingName}
                  (
                  {this.props.buildingInfoData.building}
                  )
                </Text>
                <Text style={styles.tunnelAccessiblity}>{tunnelAccessiblity}</Text>
                <Text style={styles.address}>{this.props.buildingInfoData.address}</Text>
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

            <View style={styles.buttonContainer}>
              { this.props.hasInteriorMode ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    return this.props.setBuildingInfoModalVisibilityTo(false);
                  }}
                >
                  <Text style={styles.textStyle}>View Interior Mode</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    return this.props.turnInteriorModeOff();
                  }}
                >
                  <Text style={styles.textStyle}>Return</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>


        </Modal>

      );
    }
}

const Icon = (props) => {
  if (props.accessiblity === true) {
    return <FontAwesome name="wheelchair-alt" size={22} color="orange" />;
  }
  return null;
};

export default BuildingInfoModal;
