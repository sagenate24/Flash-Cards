import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Settings from '../Settings';

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <Settings.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});
