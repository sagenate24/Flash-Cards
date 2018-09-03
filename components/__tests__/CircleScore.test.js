import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { lightBlue, yellow, red } from '../../utils/colors';
import CircleScore, { colorPicker } from '../CircleScore';

test('Deck snapShot', () => {
  const snap = renderer.create(
    <CircleScore textSize={{ fontSize: 34 }} width={5} size={130} percent={50} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

it('Should return the correct color', () => {
  expect(colorPicker(20)).toEqual(red);
  expect(colorPicker(60)).toEqual(yellow);
  expect(colorPicker(100)).toEqual(lightBlue);
});
