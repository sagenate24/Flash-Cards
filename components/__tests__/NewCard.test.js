import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { addCard } from '../../actions/decks';
import { addCardToDeck } from '../../utils/api';

import NewCard from '../NewCard';

jest.mock('../../utils/api');

it('should match Snapshot', () => {
  const snap = renderer.create(
    <NewCard.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

it('Should animate the color of the question input underline', () => {
  const wrapper = renderer.create(<NewCard.WrappedComponent />).getInstance();

  wrapper.changeUderlineColor('question');

  expect(wrapper.state.underColorQ).toEqual(true);
  expect(wrapper.state.underColorA).toEqual(false);
});

it('Should animate the color of the answer input underline', () => {
  const wrapper = renderer.create(<NewCard.WrappedComponent />).getInstance();

  wrapper.changeUderlineColor('answer');

  expect(wrapper.state.underColorQ).toEqual(false);
  expect(wrapper.state.underColorA).toEqual(true);
});

it('Should submit a new card and navigate', (done) => {
  const mockDeck = {
    questions: [
      { answer: 'a', question: 'b' },
    ],
    title: 'React',
  };

  const mockDispatch = jest.fn();

  const mockNavigation = {
    navigate: jest.fn(),
  };

  const wrapper = shallow(<NewCard.WrappedComponent deck={mockDeck} navigation={mockNavigation} dispatch={mockDispatch} />).instance();
  wrapper.setState({ answer: 'd', question: 'c' });

  wrapper.submit();
  expect(mockDispatch).toHaveBeenCalledWith(addCard({ card: { question: 'c', answer: 'd' }, deckTitle: 'React' }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockNavigation.navigate).toHaveBeenCalled();
  expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  expect(addCardToDeck).toHaveBeenCalledTimes(1);
  expect(addCardToDeck).toHaveBeenCalledWith({ question: 'c', answer: 'd' }, 'React');
  done();
});
