import 'react-native';
import React from 'react';
import CircleScore from '../CircleScore';
import renderer from 'react-test-renderer';

test('Deck snapShot', () => {
  const snap = renderer.create(
    <CircleScore textSize={{ fontSize: 34 }} width={5} size={130} percent={50} />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});