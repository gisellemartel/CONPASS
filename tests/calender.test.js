/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import DashboardScreen from '../components/home/menu/calendar/Screens/DashboardScreen';


it('Should change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'y' }
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen />).getInstance();
  const rowHasChanged = dashboardScreenComponent.rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedSecondParam);
  expect(rowHasChanged).toBe(true);
});

it('Shouldnt change rows', async () => {
  const params = {
    rowHasChangedFirstParam: { name: 'x' },
    rowHasChangedSecondParam: { name: 'x' }
  };

  const dashboardScreenComponent = renderer.create(<DashboardScreen />).getInstance();
  const rowHasChanged = dashboardScreenComponent.rowHasChanged(params.rowHasChangedFirstParam, params.rowHasChangedFirstParam);
  expect(rowHasChanged).toBe(false);
});

it('It should convert time to string', async () => {
  const dashboardScreenComponent = renderer.create(<DashboardScreen />).getInstance();
  const dateFormatted = dashboardScreenComponent.timeToString(5);
  expect(dateFormatted).toStrictEqual('1970-01-01');
});
