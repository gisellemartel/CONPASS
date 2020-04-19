import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactNative from 'react-native';

Enzyme.configure({ adapter: new Adapter() });



jest.doMock('react-native', () => {
    // Extend ReactNative
    return Object.setPrototypeOf(
      {
        // Redefine an export, like a component
        Button: 'MockedButton',
  
        // Mock out properties of an already mocked export
        LayoutAnimation: {
          ...ReactNative.LayoutAnimation,
          configureNext: jest.fn(),
        },
      },
      ReactNative,
    );
  });
  