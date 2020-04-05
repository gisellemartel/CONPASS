/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import CampusToggle from '../components/campusToggle';

let updateR;

beforeEach(() => {
  updateR = jest.fn();
});

it('Should set LatLng coordinates near Loyola campus', () => {
  const campusToggleComponent = renderer.create(<CampusToggle updateRegion={updateR} />).getInstance();
  campusToggleComponent.setLoyola();
  expect(campusToggleComponent.state.region.latitude).toBe(45.458025);
  expect(campusToggleComponent.state.region.longitude).toBe(-73.640192);
});

it('Should set LatLng coordinates near SGW campus', () => {
  const campusToggleComponent = renderer.create(<CampusToggle updateRegion={updateR} />).getInstance();
  campusToggleComponent.setSGW();
  expect(campusToggleComponent.state.region.latitude).toBe(45.495598);
  expect(campusToggleComponent.state.region.longitude).toBe(-73.577850);
});
