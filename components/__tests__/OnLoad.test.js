import 'react-native';
import React from 'react';
import OnLoad from '../OnLoad';
import renderer from 'react-test-renderer';

test('OnLoad snapShot', () => {
  const snap = renderer.create(
    <OnLoad />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});