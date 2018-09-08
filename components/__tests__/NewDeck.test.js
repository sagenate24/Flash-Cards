import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import NewDeck from '../NewDeck';

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <NewDeck.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});
