import React from 'react';
import {AsyncStorage} from 'react-native';
import renderer from 'react-test-renderer';
import LoginScreen from '../components/menu/calendar/Screens/LoginScreen/index';


test('Should throw an error message', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    try {
        await loginScreenComponent.getUserCalendars('Invalid_Access_Token');
        expect(1).toEqual(2);//this will fail if ever reached which is the case because the previous statemnet shall throw an error
    } catch (error) {
        expect(error.message).toEqual('Cannot read property \'forEach\' of undefined');
    }
});

test('Should return a false value', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    const removalStatus = await loginScreenComponent.removeOldStoredEvents();
    expect(removalStatus).toBeFalsy();

});

test('Should return a false value', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    const userEquality = await loginScreenComponent.isUserEqual('hani',null);
    expect(userEquality).toBeFalsy();
});

test('Should throw an error message', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    try {
        await loginScreenComponent.isUserEqual('hani','trevor');
        expect(1).toEqual(2);//this will fail if ever reached which is the case because the previous statemnet shall throw an error
    } catch (error) {
        expect(error.message).toEqual('Cannot read property \'length\' of undefined');
    }
});

test('Should throw an error message', async() => {
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    try {
        await loginScreenComponent.onSignIn('hani');
        expect(1).toEqual(2);//this will fail if ever reached which is the case because the previous statemnet shall throw an error
    } catch (error) {
        expect(error.message.trim()).toMatch(new RegExp('Firebase'));
    }
});

test('Should return an object with error:true in it', async() => {
    const expectedErrorObject = {error:true};
    const loginScreenComponent = renderer.create(<LoginScreen/>).getInstance();
    const errorObject = await loginScreenComponent.signInWithGoogleAsync();
    expect(errorObject).toMatchObject(expectedErrorObject);
});