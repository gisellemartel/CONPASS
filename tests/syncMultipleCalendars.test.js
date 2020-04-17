import React from 'react';
import {AsyncStorage} from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CheckboxGroup from '../components/menu/calendar/Screens/FetchScreen/CheckboxGroup';

const calendarsGeneralInfo = [{"backgroundColor": "#16a765", 
    "id": "events1",
    "storageId": "ev1",
    "summary": "Holidays",
  },
  {"backgroundColor": "#1ab891", 
  "id": "events2",
  "storageId": "ev2",
  "summary": "Math A+",
},
{"backgroundColor": "#32k824", 
"id": "events3",
"storageId": "ev3",
"summary": "School Events",
}];


it('Should return an array with "events1" in first element', () => {
    const CheckboxGroupComponent = renderer.create(<CheckboxGroup options={calendarsGeneralInfo}/>).getInstance();
    CheckboxGroupComponent.setState({calendarsToSync:['ev1']});
    const calendarsSummary = CheckboxGroupComponent.getCalendarsToBeSynced();
    expect(calendarsSummary[0]).toBe('Holidays');
});

it('Should return an empty array', () => {
    const CheckboxGroupComponent = renderer.create(<CheckboxGroup options={calendarsGeneralInfo}/>).getInstance();
    CheckboxGroupComponent.setState({calendarsToSync:[]});
    const calendarsSummary = CheckboxGroupComponent.getCalendarsToBeSynced();
    expect(calendarsSummary.length).toBe(0);
});

it('Should update calendarsToSync array state by adding ev3', ()=>{
    const CheckboxGroupComponent = renderer.create(<CheckboxGroup/>).getInstance();
    CheckboxGroupComponent.setCalendarsToSyncList('ev3');
    const calendarsToSyncFirstElement = CheckboxGroupComponent.state.calendarsToSync[0];
    expect(calendarsToSyncFirstElement).toBe('ev3');
});

it('Should update calendarsToSync array state by removing ev3', ()=>{
    const CheckboxGroupComponent = renderer.create(<CheckboxGroup/>).getInstance();
    CheckboxGroupComponent.setState({calendarsToSync:['ev3']});
    CheckboxGroupComponent.setCalendarsToSyncList('ev3');
    const calendarsToSyncArray = CheckboxGroupComponent.state.calendarsToSync;
    expect(calendarsToSyncArray).toEqual(expect.not.arrayContaining(['ev3']));
});

it('Should return a non-empty object', async ()=>{
    const CheckboxGroupComponent = renderer.create(<CheckboxGroup/>).getInstance();
    CheckboxGroupComponent.setState({calendarsToSync:['ev1','ev2']});
    AsyncStorage.setItem('ev1','{"items":["A","B"]}');
    AsyncStorage.setItem('ev2','{"items":["C","D"]}');
    const finalArrayToBeSynced = CheckboxGroupComponent.getFinalEventsArray();
    expect(finalArrayToBeSynced.length).not.toBe(0);
});