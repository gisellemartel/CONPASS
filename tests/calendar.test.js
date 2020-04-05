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
    items: [{
      start: {
        dateTime: '2021-03-26T21:30:00-04:00',
      },
      summary: 'conpass',
    },
    {
      start: {
        dateTime: '2021-03-26T21:30:00-04:00',
      },
      summary: 'conpass',
    }]
  };
  const expected = [
    {
      startDate: '2021-03-26T21:30:00-04:00',
      summary: 'conpass',
    },
    {
      startDate: '2021-03-26T21:30:00-04:00',
      summary: 'conpass',
    },
  ];
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const notify = dashboardScreenComponent
    .notify(events);
  expect(notify).toEqual(expect.arrayContaining((expected)));
});

it('Should change state', () => {
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  dashboardScreenComponent._isMounted = true;
  dashboardScreenComponent.sendInput(2);
  const bool = dashboardScreenComponent.state.timeToNotify === 2;
  expect(bool).toBe(true);
});

it('Should change isDialogVisible state', () => {
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  dashboardScreenComponent._isMounted = true;
  dashboardScreenComponent.showDialog(true);
  const bool = dashboardScreenComponent.state.isDialogVisible;
  expect(bool).toBe(true);
});

it('Should return a string', () => {
  const dashboardScreenComponent = renderer
    .create(<DashboardScreen navigation={navigation} />)
    .getInstance();
  const result = dashboardScreenComponent.sendPushNotification();
  expect(result).toStrictEqual('Notifications sent');
});
