import React from 'react';
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