import React, { Component } from 'react';
import { View, Text } from 'react-native';
import i18n from 'i18n-js';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import styles from './styles';
import languages from './languages';


class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languagesOptions: this.createValues(),
    };
    this.setLanguage = this.setLanguage.bind(this);
  }

  setLanguage(value) {
    console.log(value);
    const language = languages.find((lang) => { return lang.name === value; });
    i18n.locale = language.code;
    this.props.dispatch({ type: 'CHANGE_LANGUAGE', payload: { language: language.code } });
  }

  createValues() {
    const arr = [];
    languages.forEach((lang) => {
      arr.push({ value: lang.name });
    });
    return arr;
  }

  render() {
    const { languagesOptions } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Choose the preffered language for navigation menu, names etc.
        </Text>
        <View style={styles.dropdown}>
          <Dropdown
            label="Language"
            data={languagesOptions}
            itemCount={6}
            onChangeText={this.setLanguage}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(mapDispatchToProps)(Language);
