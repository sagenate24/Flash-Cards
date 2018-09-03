import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NewCard from '../NewCard';

test('NewCard snapShot', () => {
  const snap = renderer.create(
    <NewCard.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
