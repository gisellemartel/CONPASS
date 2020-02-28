import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Language from 'app/components/home/menu/languageView';
import styles from './styles';
import conpass from './conpass.png';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionView: null,
    };
  }

  changeView(e, screen) {
    let optionView;

    if (screen === 'language') {
      optionView = <Language />;
    }

    this.setState({ optionView });
  }

  render() {
    const { optionView } = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={conpass} />
        <View style={styles.options}>
          <Text>
            Set Calendar
          </Text>
          <Text>
            Accessibility
          </Text>
          <Text onPress={(e) => { this.changeView(e, 'language'); }}>
            Language
          </Text>
        </View>
        <Text style={styles.help}>
          Help
        </Text>
        { optionView }
      </View>
    );
  }
}
