/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import DashboardScreen from '../components/home/menu/calendar/Screens/DashboardScreen';

const navigation = {
   state: { params: { events: { items: [{start: '1234', summary: '1234', end:'1234'}] } } } 
}


it('Should change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'y' }
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />).getInstance();
  const rowHasChanged = dashboardScreenComponent.rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedSecondParam);
  expect(rowHasChanged).toBe(true);
});

it('Shouldnt change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'x' }
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />).getInstance();
  const rowHasChanged = dashboardScreenComponent.rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedFirstParam);
  expect(rowHasChanged).toBe(false);
});

it('It should convert time to string', async () => {
  const dashboardScreenComponent = renderer.create(<DashboardScreen navigation={navigation} />).getInstance();
  const dateFormatted = dashboardScreenComponent.timeToString(5);
  expect(dateFormatted).toStrictEqual('1970-01-01');
});
