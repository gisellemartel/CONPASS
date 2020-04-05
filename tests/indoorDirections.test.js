import React from 'react';
import renderer from 'react-test-renderer';
import IndoorDirections from '../components/directions/indoorDirections';

it('Should cut the string of the building name if it is too long', () => {
  const interiorModeOff = jest.fn();


  // length: 26, maximum allowed is 24
  const stringTooLong26 = '11111111111111111111111111';

  const indoorDirectionsComponent = renderer.create(<IndoorDirections
    building={stringTooLong26}
    interiorModeOff={interiorModeOff}
  />);

  const cutString24 = indoorDirectionsComponent.getInstance().limitNameLength(stringTooLong26);
  expect(cutString24.length).toBe(24);
});
