import React from 'react';
import { shallow } from 'enzyme';
import { Animated } from 'react-native';

import OnLoad from '../OnLoad';

jest.mock('Animated');

beforeEach(() => {
  Animated.timing.mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
  Animated.sequence.mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
  Animated.spring.mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
});


it('should match Snapshot', (done) => {
  const snap = shallow(<OnLoad />);

  expect(snap).toMatchSnapshot();

  done();
});
