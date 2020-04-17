import React from 'react';
import {AsyncStorage} from 'react-native';
import renderer from 'react-test-renderer';
import LoginScreen from '../components/menu/calendar/Screens/LoginScreen/index';


test('Should throw and error message', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    try {
        await loginScreenComponent.getUserCalendars('Invalid_Access_Token');
        expect(1).toEqual(2);//this will fail if ever reached which is the case because the previous statemnet shall throw an error
    } catch (error) {
        expect(error.message).toEqual('Cannot read property \'forEach\' of undefined');
    }
});