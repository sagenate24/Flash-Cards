import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../Settings';

test('Settings snapShot', () => {
  const snap = renderer.create(
    <Settings.WrappedComponent />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});