import React from 'react';
import {AsyncStorage} from 'react-native';
import renderer from 'react-test-renderer';
import FetchScreen from '../components/menu/calendar/Screens/FetchScreen/index';

const userGeneralInfo = [{'id':'ev1','storageId':'evs1','summary':'Math A+'},
{'id':'ev2','storageId':'evs2','summary':'School events'}, 
{'id':'ev3','storageId':'evs3','summary':'Holidays'}];


it('Should return a react native component', () => {
    const fetchScreenComponent = renderer.create(<FetchScreen navigation={{state:{params:{userCalendarsInfo:userGeneralInfo}}}}/>).getInstance();
    const returnedComponent = fetchScreenComponent.getDatta();
    expect(returnedComponent.$$typeof.toString()).toBe('Symbol(react.element)');
});

it('Should return an undefined', () => {
    const fetchScreenComponent = renderer.create(<FetchScreen navigation={{state:{params:null}}}/>).getInstance();
    const returnedValue = fetchScreenComponent.getDatta();
    expect(returnedValue).toBeUndefined();
});