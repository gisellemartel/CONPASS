import React, { Component } from 'react';
import {
  View, Text, ScrollView, SectionList
} from 'react-native';
import shuttleScheduleInformation from './shuttleScheduleService';
import styles from './styles';

export default class ShuttleSchedule extends Component {
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}
