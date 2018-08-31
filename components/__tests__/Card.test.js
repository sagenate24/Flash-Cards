import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';

test('Card snapShot', () => {
  const snap = renderer.create(
    <Card question='why?' answer='because' questionsRemaining={1} />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
