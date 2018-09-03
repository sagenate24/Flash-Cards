import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import OnLoad from '../OnLoad';

test('OnLoad snapShot', () => {
  const snap = renderer.create(
    <OnLoad />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
