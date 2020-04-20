import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {OutdoorDirections} from '../components/directions/outdoorDirections';
import Bus from '../components/directions/outdoorDirections/bus';
import Car from '../components/directions/outdoorDirections/car';
import Bike from '../components/directions/outdoorDirections/bike';
import Walking from '../components/directions/outdoorDirections/walking';

const mockStore = configureStore([]);


describe('OutdoorDirections', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <OutdoorDirections />
      </Provider>
    );
  });


  it('Should change mode of transportation to transit', () => {
    const instanceOutdoorDirections = component.root.findByType(OutdoorDirections);
    const busComponent = component.root.findByType(Bus);

    busComponent.props.updateMode('transit');
    expect(instanceOutdoorDirections.instance.state.mode).toBe('transit');
  });

  it('Should change mode of transportation to driving', () => {
    const instanceOutdoorDirections = component.root.findByType(OutdoorDirections);
    const carComponent = component.root.findByType(Car);

    carComponent.props.updateMode('driving');
    expect(instanceOutdoorDirections.instance.state.mode).toBe('driving');
  });

  it('Should change mode of transportation to bicycling', () => {
    const instanceOutdoorDirections = component.root.findByType(OutdoorDirections);
    const bikeComponent = component.root.findByType(Bike);

    bikeComponent.props.updateMode('bicycling');
    expect(instanceOutdoorDirections.instance.state.mode).toBe('bicycling');
  });

  it('Should change mode of transportation to walking', () => {
    const instanceOutdoorDirections = component.root.findByType(OutdoorDirections);
    const walkingComponent = component.root.findByType(Walking);

    walkingComponent.props.updateMode('walking');
    expect(instanceOutdoorDirections.instance.state.mode).toBe('walking');
  });
});
