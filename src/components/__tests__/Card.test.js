import { Animated } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../Card';

jest.mock('Animated');

beforeEach(() => {
  Animated.timing.mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
  Animated.sequence.mockImplementation(() => ({ start: jest.fn(), stop: jest.fn() }));
});

it('should match Snapshot', () => {
  const snap = renderer.create(
    <Card.WrappedComponent question='why?' answer='because' questionsRemaining={1} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
