import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NASBtn from '../NASBtn';

test('NASBtn snapshot', () => {
  const snap = renderer.create(
    <NASBtn disabled={false} onPress={jest.fn()}>test this text</NASBtn>
  ).toJSON();

  expect(snap).toMatchSnapshot();
})