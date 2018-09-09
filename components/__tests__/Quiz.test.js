import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import Quiz from '../Quiz';

let mockCurrentDeck;
let mockNavigation;

beforeEach(() => {
  mockCurrentDeck = {
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
  mockNavigation = {
    navigate: jest.fn(),
  };
});

it('should got to results after Correct answer if index + 1 equals the amount of cards', () => {
  const wrapper = shallow(<Quiz.WrappedComponent deck={mockCurrentDeck} navigation={mockNavigation} />).instance();
  wrapper.setState({ questionIndex: 1, correctAnswers: 1 });
  wrapper.correctAnswer();

  expect(mockNavigation.navigate).toHaveBeenCalled();
});

it('should + 1 to correctAnswers and + 1 to questionsIndex', () => {
  const wrapper = shallow(<Quiz.WrappedComponent deck={mockCurrentDeck} />).instance();
  wrapper.setState({ questionIndex: 0, correctAnswers: 0 });
  wrapper.correctAnswer();

  expect(wrapper.state.questionIndex).toEqual(1);
  expect(wrapper.state.correctAnswers).toEqual(1);
});

it('should got to results after Incorrect answer if index + 1 equals the amount of cards', () => {
  const wrapper = shallow(<Quiz.WrappedComponent deck={mockCurrentDeck} navigation={mockNavigation} />).instance();
  wrapper.setState({ questionIndex: 1, correctAnswers: 1 });
  wrapper.incorrectAnswer();

  expect(mockNavigation.navigate).toHaveBeenCalled();
});

it('should keep the state of correctAnswers the same and + 1 to questionsIndex', () => {
  const wrapper = shallow(<Quiz.WrappedComponent deck={mockCurrentDeck} />).instance();
  wrapper.setState({ questionIndex: 0, correctAnswers: 0 });
  wrapper.incorrectAnswer();

  expect(wrapper.state.questionIndex).toEqual(1);
  expect(wrapper.state.correctAnswers).toEqual(0);
});

it('should navigate and reset the current state', () => {
  const wrapper = shallow(<Quiz.WrappedComponent deck={mockCurrentDeck} navigation={mockNavigation} />).instance();
  wrapper.setState({ questionIndex: 0, correctAnswers: 1 });
  wrapper.goToResults('correct');

  expect(mockNavigation.navigate).toHaveBeenCalled();
  expect(wrapper.state.questionIndex).toEqual(0);
  expect(wrapper.state.correctAnswers).toEqual(0);
});
