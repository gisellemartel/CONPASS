import React, { Component } from 'react';
import {
  View, Text, ScrollView, SectionList
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import shuttleScheduleInformation from './shuttleScheduleService';
import styles from './styles';

const buttons = ['SGW', 'LOY'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export default class ShuttleSchedule extends Component {
  constructor() {
    super();
    this.state = {
      selectedButtonIndex: 0
    };
    this.updateButtonIndex = this.updateButtonIndex.bind(this);
  }

  /** The function will return the appropriate schedule.
   * Button index is as follows: 0 -> SGW and 1->LOY
   * @param {Number} selectedButtonIndex - index of the button, either 0 or 1
   */
  getShuttleCampusInformation(selectedButtonIndex) {
    if (DAYS[new Date().getDay()] === 'Saturday' || DAYS[new Date().getDay()] === 'Sunday') {
      return ['N/A'];
    }
    if (selectedButtonIndex === 1) {
      if (DAYS[new Date().getDay()] === 'Friday') {
        return shuttleScheduleInformation.Fri.LOY;
      }
      return shuttleScheduleInformation.Mon_Thu.LOY;
    }
    if (selectedButtonIndex === 0) {
      if (DAYS[new Date().getDay()] === 'Friday') {
        return shuttleScheduleInformation.Fri.SGW;
      }
      return shuttleScheduleInformation.Mon_Thu.SGW;
    }
    return ['N/A'];
  }

  /** The function will update the state, indicating which button is selected.
   * Button index is as follows: 0 -> SGW and 1->LOY
   * @param {Number} selectedButtonIndex - index of the button, either 0 or 1
   */
  updateButtonIndex(selectedButtonIndex) {
    this.setState({ selectedButtonIndex });
  }

  render() {
    const { selectedButtonIndex } = this.state;
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateButtonIndex}
          selectedIndex={selectedButtonIndex}
          buttons={buttons}
          containerStyle={{ height: 25 }}
        />
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          <SectionList
            sections={[
              {
                title: selectedButtonIndex === 0
                  ? 'Sir George Williams Campus' : 'Loyola Campus',
                data: this.getShuttleCampusInformation(selectedButtonIndex)
              },
            ]}
            renderItem={({ item }) => { return <Text style={styles.item}>{item}</Text>; }}
            renderSectionHeader={
                    ({ section }) => {
                      return <Text style={styles.sectionHeader}>{section.title}</Text>;
                    }
              }
            keyExtractor={(item, index) => { return index; }}
          />
        </ScrollView>
      </View>
    );
  }
}
