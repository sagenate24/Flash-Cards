import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { recentActivityScore } from '../../utils/api';

import Results from '../Results';

jest.mock('../../utils/api');

const mockCurrentDeck = {
  title: 'React',
  timeStamp: 1534284894237,
  recentScore: 35,
  questions: [
    {
      question: 'What is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is React?',
      answer: 'A library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfaces',
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event',
    },
  ],
};

it('should flip card', (done) => {
  const wrapper = shallow(<Results.WrappedComponent deck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()} />).instance();
  const handlePercent = wrapper.handlePercent();

  expect(handlePercent).toEqual(50);

  done();
});

it('should navigate correctly', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const wrapper = shallow(<Results.WrappedComponent deck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()} navigation={mockNavigation} />).instance();
  wrapper.goTo('Deck');

  expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
});

it('should save the score from the quiz', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(<Results.WrappedComponent deck={mockCurrentDeck} correctAnswers={1} dispatch={mockDispatch} />).instance();
  const nowTime = Date.now();
  wrapper.componentDidMount();

  expect(recentActivityScore).toHaveBeenCalled();
  expect(recentActivityScore).toHaveBeenCalledWith('React', 50, nowTime);
  expect(mockDispatch).toHaveBeenCalled();
});
