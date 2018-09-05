import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import OnLoad from '../OnLoad';

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <OnLoad />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});
