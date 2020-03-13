import React, { Component } from 'react';
import {
  View, Text, ScrollView, SectionList
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import shuttleScheduleInformation from './shuttleScheduleService';
import styles from './styles';

export default class ShuttleSchedule extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ['SGW', 'LOY'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 25 }}
        />
        {selectedIndex === 0
          ? (
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
                    title: 'Sir George Williams Campus',
                    data: shuttleScheduleInformation.Mon_Thu.SGW
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
          ) : (
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
                    title: 'Loyola Campus',
                    data: shuttleScheduleInformation.Mon_Thu.LOY
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
          )}
      </View>
    );
  }
}
