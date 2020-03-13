/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import SwitchCampuses from '../components/switchCampuses';

beforeEach(() => {
  updateR = jest.fn();
});

it('Should set LatLng coordinates near Loyola campus', () => {
  const switchCampusesComponent = renderer.create(<SwitchCampuses updateRegion={updateR} />).getInstance();
  switchCampusesComponent.setLoyola();
  expect(switchCampusesComponent.state.region.latitude).toBe(45.458025);
  expect(switchCampusesComponent.state.region.longitude).toBe(-73.640192);
});

it('Should set LatLng coordinates near SGW campus', () => {
  const switchCampusesComponent = renderer.create(<SwitchCampuses updateRegion={updateR} />).getInstance();
  switchCampusesComponent.setSGW();
  expect(switchCampusesComponent.state.region.latitude).toBe(45.495598);
  expect(switchCampusesComponent.state.region.longitude).toBe(-73.577850);
});
