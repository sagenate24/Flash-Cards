import 'react-native';
import React from 'react';
import NewCard from '../NewCard';
import renderer from 'react-test-renderer';

test('NewCard snapShot', () => {
  const snap = renderer.create(
    <NewCard.WrappedComponent />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});