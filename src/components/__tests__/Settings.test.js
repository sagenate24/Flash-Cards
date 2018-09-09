import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { addProfileName } from '../../utils/api';
import { editUsername } from '../../actions/profile';

import Settings from '../Settings';

jest.mock('../../utils/api');

let mockDispatch;
let mockNavigation;

beforeEach(() => {
  mockDispatch = jest.fn();
  mockNavigation = {
    navigate: jest.fn(),
  };
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

it('should match Snapshot', () => {
  const snap = renderer.create(
    <Settings.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

it('should add profile name and navigate', () => {
  const wrapper = shallow(<Settings.WrappedComponent dispatch={mockDispatch} navigation={mockNavigation} />).instance();
  wrapper.setState({ userName: 'johnDoe', showInput: true });
  wrapper.submitUserName();

  expect(wrapper.state.userName).toEqual('');
  expect(wrapper.state.showInput).toEqual(false);
  expect(addProfileName).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(editUsername('johnDoe'));
  expect(setTimeout).toHaveBeenCalled();

  expect(mockNavigation.navigate).not.toBeCalled();

  jest.runAllTimers();

  expect(mockNavigation.navigate).toHaveBeenCalled();
});

it('should navigate', () => {
  const wrapper = shallow(<Settings.WrappedComponent navigation={mockNavigation} />).instance();
  wrapper.goTo('Profile');

  expect(setTimeout).toHaveBeenCalled();

  jest.runAllTimers();

  expect(mockNavigation.navigate).toHaveBeenCalled();
});

it('should show the input', () => {
  const wrapper = shallow(<Settings.WrappedComponent />).instance();
  wrapper.setState({ showInput: false, underColorU: true, userName: 'johnDoe' });
  wrapper.showOrHideInput();

  expect(wrapper.state.showInput).toEqual(true);
  expect(wrapper.state.underColorU).toEqual(false);
  expect(wrapper.state.userName).toEqual('');
});

it('should hide the input', () => {
  const wrapper = shallow(<Settings.WrappedComponent />).instance();
  wrapper.setState({ showInput: true });
  wrapper.showOrHideInput();

  expect(wrapper.state.showInput).toEqual(false);
});
