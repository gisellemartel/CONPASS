/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Addresses from '../components/addresses';
import Bus from '../components/addresses/bus';


it('Should change mode of transportation to transit', () => {
  const addressesComponent = renderer.create(<Addresses />);
  instanceAddresses = addressesComponent.root;
  const busComponent = instanceAddresses.findByType(Bus);

  busComponent.props.updateMode('transit');
  expect(addressesComponent.getInstance().state.mode).toBe('transit');
});
