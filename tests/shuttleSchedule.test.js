import React from 'react';
import renderer from 'react-test-renderer';
import ShuttleSchedule from '../components/menu/shuttleBusSchedule';

let loyolaScheduleMonThu;
let sgwScheduleMonThu;
let DATE_TO_USE = new Date('2020-03-18T12:54:59.218Z'); // a wednesday
beforeEach(() => {
  // Solution for how to mock the Date class in javascript was found here : https://stackoverflow.com/questions/29719631/how-do-i-set-a-mock-date-in-jest
  // eslint-disable-next-line no-underscore-dangle
  const _Date = Date;
  const MockDate = (...args) => {
    switch (args.length) {
      case 0:
        return DATE_TO_USE;
      default:
        return new _Date(...args);
    }
  };
  MockDate.UTC = _Date.UTC;
  MockDate.now = () => { DATE_TO_USE.getTime(); };
  MockDate.parse = _Date.parse;
  MockDate.toString = _Date.toString;
  MockDate.prototype = _Date.prototype;
  global.Date = MockDate;
  sgwScheduleMonThu = ['7:45',
    '8:05',
    '8:20',
    '8:35',
    '8:55',
    '9:10',
    '9:30',
    '9:45',
    '10:05',
    '10:20',
    '10:55',
    '11:10',
    '11:45',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:10',
    '20:30',
    '21:00',
    '21:25',
    '21:45',
    '22:00',
    '22:30',
    '23:00'];
  loyolaScheduleMonThu = ['7:30',
    '7:40',
    '7:55',
    '8:20',
    '8:35',
    '8:55',
    '9:10',
    '9:30',
    '9:45',
    '10:20',
    '10:35',
    '10:55',
    '11:10',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:00',
    '20:30',
    '20:45',
    '21:05',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    ''];
});

it('Should set index of the button to 0', () => {
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  shuttleScheduleComponent.updateButtonIndex(0);
  expect(shuttleScheduleComponent.state.selectedButtonIndex).toBe(0);
});

it('Should set index of the button to 1', () => {
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  shuttleScheduleComponent.updateButtonIndex(1);
  expect(shuttleScheduleComponent.state.selectedButtonIndex).toBe(1);
});

it('Should return times for Loyola\'s shuttle service', () => {
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  const response = shuttleScheduleComponent.getShuttleCampusInformation(1);
  expect(response).toStrictEqual(loyolaScheduleMonThu);
});

it('Should return times for SGW\'s shuttle service', () => {
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  const response = shuttleScheduleComponent.getShuttleCampusInformation(0);
  expect(response).toStrictEqual(sgwScheduleMonThu);
});

it('Should return times for SGW\'s shuttle service on weekend', () => {
  DATE_TO_USE = new Date('2020-03-21T12:54:59.218Z'); // Saturday
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  const response = shuttleScheduleComponent.getShuttleCampusInformation(0);
  expect(response).toStrictEqual(['N/A']);
});

it('Should return times for Loyola\'s shuttle service on a weekend', () => {
  DATE_TO_USE = new Date('2020-03-21T12:54:59.218Z'); // Saturday
  const shuttleScheduleComponent = renderer.create(<ShuttleSchedule />).getInstance();
  const response = shuttleScheduleComponent.getShuttleCampusInformation(1);
  expect(response).toStrictEqual(['N/A']);
});
