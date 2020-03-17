import React from 'react';
import renderer from 'react-test-renderer';
import ShuttleSchedule from '../components/home/menu/shuttleBusSchedule';

let loyolaScheduleMonThu;

beforeEach(() => {
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
