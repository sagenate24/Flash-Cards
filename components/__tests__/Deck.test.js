import 'react-native';
import React from 'react';
import Deck from '../Deck';
import renderer from 'react-test-renderer';

const mockCurrentDeck = {
  questions: [{anser: "a", question: "b"}],
  title: "Bs",
}

test('Deck snapShot', () => {
  const snap = renderer.create(
    <Deck.WrappedComponent deck={mockCurrentDeck} />
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
