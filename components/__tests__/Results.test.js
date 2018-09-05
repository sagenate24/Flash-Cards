import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Results from '../Results';

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
  JavaScript: {
    title: 'JavaScript',
    timeStamp: 1534284869329,
    recentScore: 100,
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical enviornment with in which that function was declared.',
      },
    ],
  },
};

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <Results.WrappedComponent deck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});

it('should flip card', (done) => {
  const wrapper = renderer.create(<Results.WrappedComponent deck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()} />).getInstance();
  const handlePercent = wrapper.handlePercent();

  expect(handlePercent).toEqual(50);

  done();
});
