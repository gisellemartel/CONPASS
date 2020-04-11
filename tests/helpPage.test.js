import {LayoutAnimation} from 'react-native';

//Mocking for LayoutAnimation module solution from: 
// https://gitmemory.com/issue/facebook/react-native/26579/538610849

test(`LayoutAnimation.configureNext is mocked`, () => {
    expect(LayoutAnimation).toBeDefined();
    expect(LayoutAnimation.configureNext).toBeDefined();
    expect(LayoutAnimation.configureNext.mock).toBeDefined();
  });