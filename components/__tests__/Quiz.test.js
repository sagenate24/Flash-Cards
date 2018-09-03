import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Quiz from '../Quiz';

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

test('Quiz snapShot', () => {
  const snap = renderer.create(
    <Quiz.WrappedComponent deck={mockCurrentDeck} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
