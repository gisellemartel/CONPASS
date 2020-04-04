import React from 'react';
import { shallow } from 'enzyme';
import CustomPolygon from '../components/map/customPolygon';
import buildings from '../assets/polygons/polygons';

const building = buildings[0];

it('It should build custom polygon when given a building', async () => {
  const focusOnBuilding = jest.fn();
  // const spyZoomBuilding = jest.spyOn(wrapper.instance(), 'fitScreenToPath');
  const wrapper = shallow(<CustomPolygon focusOnBuilding={focusOnBuilding} building={building} />);
  wrapper.instance().zoomBuilding();
  expect(wrapper.instance().props.focusOnBuilding).toBeCalled();
});
