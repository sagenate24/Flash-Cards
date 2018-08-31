import 'react-native';
import React from 'react';
import NewDeck from '../NewDeck';
import renderer from 'react-test-renderer';

test('NewDeck snapShot', () => {
  const snap = renderer.create(
    <NewDeck.WrappedComponent />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});