/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Addresses from '../components/addresses';
import Bus from '../components/addresses/bus';
import Car from '../components/addresses/car';
import Bike from '../components/addresses/bike';
import Walking from '../components/addresses/walking';


it('Should change mode of transportation to transit', () => {
  const addressesComponent = renderer.create(<Addresses />);
  instanceAddresses = addressesComponent.root;
  const busComponent = instanceAddresses.findByType(Bus);

  busComponent.props.updateMode('transit');
  expect(addressesComponent.getInstance().state.mode).toBe('transit');
});

it('Should change mode of transportation to driving', () => {
  const addressesComponent = renderer.create(<Addresses />);
  instanceAddresses = addressesComponent.root;
  const carComponent = instanceAddresses.findByType(Car);

  carComponent.props.updateMode('driving');
  expect(addressesComponent.getInstance().state.mode).toBe('driving');
});

it('Should change mode of transportation to bicycling', () => {
  const addressesComponent = renderer.create(<Addresses />);
  instanceAddresses = addressesComponent.root;
  const bikeComponent = instanceAddresses.findByType(Bike);

  bikeComponent.props.updateMode('bicycling');
  expect(addressesComponent.getInstance().state.mode).toBe('bicycling');
});

it('Should change mode of transportation to walking', () => {
  const addressesComponent = renderer.create(<Addresses />);
  instanceAddresses = addressesComponent.root;
  const walkingComponent = instanceAddresses.findByType(Walking);

  walkingComponent.props.updateMode('walking');
  expect(addressesComponent.getInstance().state.mode).toBe('walking');
});
