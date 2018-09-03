import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Deck from '../Deck';

const mockCurrentDeck = {
  questions: [{ anser: 'a', question: 'b' }],
  title: 'reactAndThings',
};

test('Deck snapShot', () => {
  const snap = renderer.create(
    <Deck.WrappedComponent deck={mockCurrentDeck} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

it('should flip card', () => {
  const wrapper = renderer.create(<Deck.WrappedComponent deck={mockCurrentDeck} />).getInstance();
  const cardLength = wrapper.cardLength(mockCurrentDeck.questions);

  expect(cardLength).toEqual('1 Card  |');
});
