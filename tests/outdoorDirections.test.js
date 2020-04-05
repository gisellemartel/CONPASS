import React from 'react';
import renderer from 'react-test-renderer';
import OutdoorDirections from '../components/directions/outdoorDirections';
import Bus from '../components/directions/outdoorDirections/bus';
import Car from '../components/directions/outdoorDirections/car';
import Bike from '../components/directions/outdoorDirections/bike';
import Walking from '../components/directions/outdoorDirections/walking';


it('Should change mode of transportation to transit', () => {
  const outdoorDirectionsComponent = renderer.create(<OutdoorDirections />);
  const instanceOutdoorDirections = outdoorDirectionsComponent.root;
  const busComponent = instanceOutdoorDirections.findByType(Bus);

  busComponent.props.updateMode('transit');
  expect(outdoorDirectionsComponent.getInstance().state.mode).toBe('transit');
});

it('Should change mode of transportation to driving', () => {
  const outdoorDirectionsComponent = renderer.create(<OutdoorDirections />);
  const instanceOutdoorDirections = outdoorDirectionsComponent.root;
  const carComponent = instanceOutdoorDirections.findByType(Car);

  carComponent.props.updateMode('driving');
  expect(outdoorDirectionsComponent.getInstance().state.mode).toBe('driving');
});

it('Should change mode of transportation to bicycling', () => {
  const outdoorDirectionsComponent = renderer.create(<OutdoorDirections />);
  const instanceOutdoorDirections = outdoorDirectionsComponent.root;
  const bikeComponent = instanceOutdoorDirections.findByType(Bike);

  bikeComponent.props.updateMode('bicycling');
  expect(outdoorDirectionsComponent.getInstance().state.mode).toBe('bicycling');
});

it('Should change mode of transportation to walking', () => {
  const outdoorDirectionsComponent = renderer.create(<OutdoorDirections />);
  const instanceOutdoorDirections = outdoorDirectionsComponent.root;
  const walkingComponent = instanceOutdoorDirections.findByType(Walking);

  walkingComponent.props.updateMode('walking');
  expect(outdoorDirectionsComponent.getInstance().state.mode).toBe('walking');
});
