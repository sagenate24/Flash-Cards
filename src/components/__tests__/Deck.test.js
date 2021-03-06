import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { removeDeck } from '../../utils/api';

import Deck from '../Deck';

jest.mock('../../utils/api');

let mockDeck;
let mockDeck2;

beforeEach(() => {
  mockDeck = {
    questions: [{ anser: 'a', question: 'b' }],
    title: 'reactAndThings',
  };
  mockDeck2 = {
    questions: [
      { anser: 'a', question: 'b' },
      { anser: 'c', question: 'd' },
    ],
    title: 'reactAndThings2',
  };
});

it('should return null if the deck is null', () => {
  const wrapper = renderer.create(<Deck.WrappedComponent deck={null} />).getInstance();

  expect(wrapper.render()).toEqual(null);
});

it('should return the correct string with one card', (done) => {
  const wrapper = renderer.create(<Deck.WrappedComponent deck={mockDeck} />).getInstance();
  const cardLength = wrapper.cardLength(mockDeck.questions);

  expect(cardLength).toEqual('1 Card  |');

  done();
});

it('should return the correct string with more than one card', () => {
  const wrapper = renderer.create(<Deck.WrappedComponent deck={mockDeck2} />).getInstance();
  const cardLength = wrapper.cardLength(mockDeck2.questions);

  expect(cardLength).toEqual('2 Cards  |');
});

it('should return the correct string with no cards', () => {
  const wrapper = renderer.create(<Deck.WrappedComponent deck={mockDeck} />).getInstance();
  const cardLength = wrapper.cardLength([]);

  expect(cardLength).toEqual('0 Cards  |');
});

it('should remove the deck', () => {
  const removeMock = jest.fn();
  const goBackMock = jest.fn();

  const wrapper = shallow(<Deck.WrappedComponent deck={mockDeck} remove={removeMock} goBack={goBackMock} />).instance();
  wrapper.handleRemoveDeck();

  expect(removeMock).toHaveBeenCalled();
  expect(removeMock).toHaveBeenCalledTimes(1);
  expect(goBackMock).toHaveBeenCalled();
  expect(goBackMock).toHaveBeenCalledTimes(1);
  expect(removeDeck).toHaveBeenCalled();
  expect(removeDeck).toHaveBeenCalledTimes(1);
  expect(removeDeck).toHaveBeenCalledWith('reactAndThings');
});
