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
