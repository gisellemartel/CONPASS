/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import DashboardScreen from '../components/home/menu/calendar/Screens/DashboardScreen';

const navigation = {
  state: { params: { events: { items: [{ start: '1234', summary: '1234', end: '1234' }] } } }
};


it('Should change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'y' }
  };

  const dashboardScreenComponent = renderer
    .create(<DashboardScreen navigation={navigation} />).getInstance();
  const rowHasChanged = dashboardScreenComponent
    .rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedSecondParam);
  expect(rowHasChanged).toBe(true);
});

it('Shouldnt change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'x' }
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const rowHasChanged = dashboardScreenComponent
    .rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedFirstParam);
  expect(rowHasChanged).toBe(false);
});

it('Should render empty date', async () => {
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const renderEmptyDate = dashboardScreenComponent.renderEmptyDate();
  const bool = renderEmptyDate.length === 0;
  expect(bool).toBe(false);
});

it('Should render items', async () => {
  const jsonFile = {
    address: '',
    description: '',
    endTime: '2020-03-28T18:30:00-04:00',
    height: 80,
    name: 'event 2',
    startTime: '2020-03-28T17:30:00-04:00',
  };
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const renderItem = dashboardScreenComponent.renderItem(jsonFile);
  const bool = renderItem.length === 0;
  expect(bool).toBe(false);
});

it('It should convert time to string', async () => {
  const dashboardScreenComponent = renderer
    .create(<DashboardScreen navigation={navigation} />).getInstance();
  const dateFormatted = dashboardScreenComponent.timeToString(5);
  expect(dateFormatted).toStrictEqual('1970-01-01');
});


it('It should get events', async () => {
  const events = [
    {
      end: { dateTime: null },
      start: { dateTime: null },
      description: null,
      title: { summary: null },
    },
  ];
  const expected = [{
    address: '',
    date: undefined,
    description: '',
    endTime: undefined,
    startTime: undefined,
    title: 'No Title For this Event'
  }];
  // eslint-disable-next-line max-len
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />).getInstance();
  const eventFormatted = dashboardScreenComponent.structureSynchronizedEvents(events);
  expect(eventFormatted).toEqual(expect.arrayContaining((expected)));
});

it('Should not load items', async () => {
  const dashboardScreenComponent = renderer
    .create(<DashboardScreen navigation={navigation} />).getInstance();
  const eventFormatted = dashboardScreenComponent.loadItems(1);
  expect(eventFormatted).toEqual((undefined));
});

it('Should fill array', async () => {
  const events = {
    created: '2020-03-27T01:28:07.000Z',
    creator: {
      email: 'bazerbachi.talal@gmail.com',
      self: true,
    },
    end: {
      dateTime: '2020-03-26T22:30:00-04:00',
    },
    etag: '\"3170544975746000\"',
    htmlLink: 'https://www.google.com/calendar/event?eid=M2ZlMGRibDlpZWpqOHFsOHVhZnVrOWZlOWMgYmF6ZXJiYWNoaS50YWxhbEBt',
    iCalUID: '3fe0dbl9iejj8ql8uafuk9fe9c@google.com',
    id: '3fe0dbl9iejj8ql8uafuk9fe9c',
    kind: 'calendar#event',
    organizer: {
      email: 'bazerbachi.talal@gmail.com',
      self: true,
    },
    reminders: {
      useDefault: true,
    },
    sequence: 0,
    start: {
      dateTime: '2020-03-26T21:30:00-04:00',
    },
    status: 'confirmed',
    summary: 'conpass',
    updated: '2020-03-27T01:28:07.873Z',
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const notify = dashboardScreenComponent
    .notify(events);
  expect(typeof notify).toBe('object');
});
