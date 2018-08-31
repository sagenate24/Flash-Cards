import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DeckOption from '../DeckOption';

test('DeckOption snapShot', () => {
  const snap = renderer.create(
    <DeckOption size={34} name='cards-outline' iconStyle={{ color: '#000'}} subHeaderColor={{ color: '#fff' }}/>
  ).toJSON();

  expect(snap).toMatchSnapshot()
})